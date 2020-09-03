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
//connectoin check....
app.get("/", (req, res) => {
  return res.status(200).send("working!!!");
});
//vehile registation....
app.post('/api/vechile/registraion', (req,res) =>{
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
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            url: publicUrl,
          };
          admin
            .database()
            .ref("products")
            .child(req.body.id)
            .set(data)
            .then((snapshot) => {
              res.status(200).send("done");
            });
          admin
            .firestore()
            .collection("products")
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



