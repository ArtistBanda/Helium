import React, { useEffect, useState } from "react";
import fire from "../../fire";
import "./speed.css";
import BootstrapTable from "react-bootstrap-table-next";
import MyVerticallyCenteredModal from "../modal/modal";
function Speed() {
  const [speed, setspeed] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [img, setimg] = useState(null);
  useEffect(() => {
    // const main = [];
    const unsubscribe = fire
      .database()
      .ref("speed")
      .on("value", function (snapshot) {
        const main = [];
        setspeed([]);
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var data = [];
          childSnapshot.forEach(function (childSnapshot2) {
            data.push(childSnapshot2.val());
          });
          main.push({ id: key, data: data });
          // console.log({ id: key, data: data });
        });
        // console.log(main);
        setspeed(main);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // async function getspeed() {
  //   var main = [];
  //   let speedQuery = fire.database().ref("speed");
  //   speedQuery.on(
  //     "value",
  //     function (snapshot) {
  //       snapshot.forEach(function (childSnapshot) {
  //         var key = childSnapshot.key;
  //         var data = [];
  //         childSnapshot.forEach(function (childSnapshot2) {
  //           data.push(childSnapshot2.val());
  //         });
  //         main.push({ id: key, data: data });
  //         console.log({ id: key, data: data });
  //       });
  //       console.log(main);
  //       setspeed(main);
  //     },
  //     function (error) {
  //       console.error(error);
  //     }
  //   );
  // }

  const columns = [
    {
      dataField: "id",
      text: "Reg Number",
      headerStyle: {
        width: "1000px",
        whiteSpace: "normal",
      },
    },
    {
      dataField: "data",
      text: "Car Speed",
      formatter: rankFormatter,
      headerStyle: {
        width: "800px",
        whiteSpace: "normal",
      },
    },
    {
      dataField: "data",
      text: "Car Problem",
      formatter: rankFormatterProblem,
      headerStyle: {
        width: "800px",
        whiteSpace: "normal",
      },
    },
    {
      dataField: "data",
      text: "Car Snapshot",
      formatter: rankFormatterLink,
      headerStyle: {
        width: "100px",
        whiteSpace: "normal",
      },
    },
  ];
  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    // console.log("row", row.data[0].speed);
    return row.data.map((value, i) => {
      return (
        <div
          className={
            value.overspeed === true || value.deviated === true
              ? "text-danger widthSize"
              : "text-success widthSize"
          }
        >
          {i + 1} : Car Speed : {value.speed} at Location : {value.path}
          <hr></hr>
        </div>
      );
    });
  }
  function rankFormatterProblem(cell, row, rowIndex, formatExtraData) {
    // console.log("row", row.data[0].speed);
    return row.data.map((value, i) => {
      return (
        <div
          className={
            value.overspeed === true || value.deviated === true
              ? "text-danger widthSize"
              : "text-success widthSize"
          }
        >
          {i + 1} :{" "}
          {value.overspeed === true
            ? value.deviated === true
              ? "Car found overspeeding at restricted location."
              : "Car found overspeeding"
            : value.deviated === true
            ? "Car found at restricted location"
            : "Car under control"}
          <hr></hr>
        </div>
      );
    });
  }
  const madalCOntent = (value) => {
    setModalShow(true);
    setimg(value);
  };
  function rankFormatterLink(cell, row, rowIndex, formatExtraData) {
    return row.data.map((value, i) => {
      return (
        <div className="text-primary ">
          <div onClick={() => madalCOntent(value.link)}>
            <h3>
              <i class="fas fa-map-marked-alt"></i>
            </h3>
          </div>
          <hr></hr>
        </div>
      );
    });
  }
  return (
    <div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        imgTag={img}
      />
      <div className="p-4 tableScroll">
        <BootstrapTable
          striped
          hover
          condensed
          keyField="id"
          data={speed}
          columns={columns}
          bordered={false}
        />
      </div>
    </div>
  );
}

export default Speed;
