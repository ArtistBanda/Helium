import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbfTNeB9bP_rwXN1lq3_4AGkqNTxQD6uQ",
  authDomain: "functions-801a7.firebaseapp.com",
  databaseURL: "https://functions-801a7.firebaseio.com",
  projectId: "functions-801a7",
  storageBucket: "functions-801a7.appspot.com",
  messagingSenderId: "737546208791",
  appId: "1:737546208791:web:8f3744468857c29fbafe52",
  measurementId: "G-GDTPPSDM72",
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;
