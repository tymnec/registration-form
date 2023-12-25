const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/signup");

let db = mongoose.connection;
db.on("error", console.log.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("MongoDB connection successful");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const user = req.body;

  db.collection("users").insertOne(user, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("User added successfully");
    }
  });

  res.redirect("/signup_success.html");
});

app
  .get("/", (req, res) => {
    res.set({ "Access-Control-Allow-Origin": "*" });
    return res.redirect("/index.html");
  })
  .listen(3000);

console.log("Server running on port 3000");
