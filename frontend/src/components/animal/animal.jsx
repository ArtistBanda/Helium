import React, { useEffect, useState } from "react";
import fire from "../../fire";
import "./animal.css";
import BootstrapTable from "react-bootstrap-table-next";
import MyVerticallyCenteredModal from "../modal/modal";
function Animal() {
  const [animalList, setanimalList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [img, setimg] = useState(null);
  useEffect(() => {
    const unsubscribe = fire
      .database()
      .ref("animalTagging")
      .on("value", function (snapshot) {
        const main = [];
        setanimalList([]);
        snapshot.forEach(function (childSnapshot) {
          main.push({
            key: childSnapshot.key,
            data: childSnapshot.val(),
          });
          console.log({ key: childSnapshot.key, data: childSnapshot.val() });
        });
        setanimalList(main);
      });
    //   .database()
    //   .ref("speed")
    //   .on("value", (snapshot) => {
    //     console.log(snapshot);
    //     const main = [];
    //     setspeed([]);
    //     snapshot.forEach(function (childSnapshot) {
    //       var key = childSnapshot.key;
    //       var data = [];
    //       childSnapshot.forEach(function (childSnapshot2) {
    //         data.push(childSnapshot2.val());
    //       });
    //       main.push({ id: key, data: data });
    //     });
    //     setspeed(main);
    //   });
    return () => {
      unsubscribe();
    };
  }, []);
  const columns = [
    // {
    //   dataField: "key",
    //   text: "Key",
    //   headerStyle: (column, colIndex) => {
    //     if (colIndex % 2 === 0) {
    //       return {
    //         backgroundColor: "#D1C4E9",
    //       };
    //     }
    //     return {
    //       backgroundColor: "#B39DDB",
    //     };
    //   },
    // },
    {
      dataField: "data.animal",
      text: "Animal Name",
      headerStyle: (column, colIndex) => {
        if (colIndex % 2 === 0) {
          return {
            backgroundColor: "#D1C4E9",
          };
        }
        return {
          backgroundColor: "#B39DDB",
        };
      },
    },
    {
      dataField: "data.location",
      text: "Animal Location",
      headerStyle: (column, colIndex) => {
        if (colIndex % 2 === 0) {
          return {
            backgroundColor: "#D1C4E9",
          };
        }
        return {
          backgroundColor: "#B39DDB",
        };
      },
    },
    {
      dataField: "data.time",
      text: "Time Found",
      headerStyle: (column, colIndex) => {
        if (colIndex % 2 === 0) {
          return {
            backgroundColor: "#D1C4E9",
          };
        }
        return {
          backgroundColor: "#B39DDB",
        };
      },
    },
    {
      dataField: "data.link",
      text: "Animal Snapshot",
      formatter: rankFormatterLink,
      headerStyle: (column, colIndex) => {
        if (colIndex % 2 === 0) {
          return {
            backgroundColor: "#D1C4E9",
          };
        }
        return {
          backgroundColor: "#B39DDB",
        };
      },
    },
  ];
  // function rankFormatterLink(cell, row, rowIndex, formatExtraData) {
  //   return (
  //     <div className="text-primary ">
  //       <a href={row.data.link}>
  //         {" "}
  //         <h3>
  //           <i class="fas fa-paw"></i>
  //         </h3>
  //       </a>
  //     </div>
  //   );
  // }
  const madalCOntent = (value) => {
    setModalShow(true);
    setimg(value);
  };
  function rankFormatterLink(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="text-primary ">
        <div onClick={() => madalCOntent(row.data.link)}>
          <h3>
            <i class="fas fa-paw"></i>
          </h3>
        </div>
        <hr></hr>
      </div>
    );
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
          data={animalList}
          columns={columns}
          bordered={false}
        />
      </div>
    </div>
  );
}

export default Animal;
