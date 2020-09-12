const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const fileMiddleware = require("express-multipart-file-parser");
//intialize firbase application....
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "DATABASE_URL",
  });
//intialize app....
const app = express();
app.use(cors({ origin: true }));
app.use(fileMiddleware);
//connection check....
app.get("/", (req, res) => {
  return res.status(200).send("working!!!");
});
//vehile registation....
app.post('/create/vechile/registraion', (req,res) =>{
      const bucket = admin.storage().bucket("BUCKET_URL");
      try {
        if (!req.files[0]) {
          res.status(400).send("Error, could not upload file");
          return;
        }
        const blob = bucket.file(req.files[0].originalname);
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.files[0].mimetype,
          },
        });0
        blobWriter.on("error", (err) => next(err));
        await blobWriter.on("finish", () => {
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;
          res
            .status(200)
            .send({ fileName: req.files[0].originalname, fileLocation: publicUrl });
          const data = {
            regNum: req.body.regNum,
            model: req.body.model,
            timestamp: req.body.time,
            url: publicUrl,
          };
          admin
            .firestore()
            .collection("registration")
            .doc("/" + req.body.id + "/")
            .create(data)
            .then((snap) => {
              res.status(200).send(data);
            })
            .catch((e) => {
              console.log(e);
              res.status(500).send(e);
            });
        });
        blobWriter.end(req.files[0].buffer);
      } catch (error) {
        res.status(400).send(error);
        return;
      }
});

//getting registration data....
app.get("/get/firestore", (req, res) => {
  admin
    .firestore()
    .collection("registration")
    .get()
    .then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      res.status(200).send(tempDoc);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });
});
//adding path to vechile....
app.post("/addpth/:regnum", (req, res) => {
  var id = req.params.regnum;
  var data = {
    pth: req.body.path,
  };
  admin
    .database()
    .ref("path")
    .child(id)
    .push(data)
    .then((snapshot) => {
      res.status(200).send(id + "added with path" + req.body.path );
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });
});
//addspeed (Realtime)
app.post("/api/speed/realtime", (req, res) => {
  const data = {
    speed: req.body.name,
  };
  var speedQuery = admin.database().ref("speed").child("RJ14QC4805");
  speedQuery.push(data).then((snapshot) => {
    res.status(200).send(speedQuery.key);
  });
});
//getspeed (realtime)
app.get("/api/speed/realtime", (req, res) => {
  var list = [];
  var data = [];
  var speedQuery = admin.database().ref("speed");
  speedQuery.once("value").then(async (snapshot) => {
    await snapshot.forEach(function (childSnapshot) {
      var key = childSnapshot.key;
      admin
        .database()
        .ref("speed")
        .child(key)
        .once("value")
        .then(async (snapshot) => {
          await snapshot.forEach(function (childSnapshot2) {
            var key = childSnapshot.key;
            data.push(key);
          });
          list.push({
            id: key,
            data: data,
          });
          res.status(200).send({ list: list });
        });
    });
  });
});