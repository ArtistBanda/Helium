import React, { useEffect, useState } from "react";
import fire from "../../fire";
import "./home.css";
import BootstrapTable from "react-bootstrap-table-next";
function Home() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const unsubscribe = fire
      .firestore()
      .collection("registration")
      .get()
      .then((querySnapshot) => {
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        console.log(tempDoc);
        setdata(tempDoc);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <div class="container-fluid">
        <div className="d-flex justify-content-center mt-3">
          <h4>ACKR REGISTRATION OF VEHICLE</h4>
        </div>
        <div class="row justify-content-center text-center card-row p-2">
          {data.map((value, i) => {
            return (
              <div class="col-md-2 text-center d-flex justify-content-center rest-card mt-3">
                <div class="card shadow">
                  <img src={value.url} class="card-img-top cardImg" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{value.id}</h5>
                    <p class="card-text">Model : {value.model}</p>
                    <p class="card-text">
                      Time of registration : {value.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
