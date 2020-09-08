import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import fire from "./fire";

function App() {
  useEffect(() => {
    let mes = fire
      .database()
      .ref("products")
      .child("9")
      .child("name")
      .on("value", (snap) => {
        console.log(snap.val());
      });

    let meds = fire
      .firestore()
      .collection("registration")
      .get()
      .then((querySnapshot) => {
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        console.log(tempDoc);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
