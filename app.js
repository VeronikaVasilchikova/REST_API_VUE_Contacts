const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const {v4} = require("uuid");
const {uri, port} = require("./config");
const mongoose = require("mongoose");
const Contacts = require("./models/contact");

app.use(express.json());
app.use(cors());

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contacts.find();
		res.send(contacts);
  }
  catch (e) {
    res.status(500);
		res.send("Internal Server Error");
  }
});

app.post("/api/contacts", async (req, res) => {
  const contacts = new Contacts({...req.body, marked: false});
  try {
    contacts.save();
    res.send(contacts);
  }
  catch (e) {
    res.status(500);
		res.send("Internal Server Error");
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await Contacts.deleteOne({_id: req.params.id});
    res.status(200).send({message: "The contact was removed"});
  }
  catch (e) {
    res.status(500);
		res.send("Internal Server Error");
  }
});

app.put("/api/contacts/:id", async (req, res) => {
  try {
    await Contacts.findByIdAndUpdate(req.params.id, req.body);
  }
  catch (e) {
    res.status(500);
		res.send("Internal Server Error");
  }
});

app.use(express.static(path.resolve(__dirname, "client")));
app.get("*", (req, res) => {
  res.sendFile((path.resolve(__dirname, "client", "index.html")));
});

const start = async () => {
  try {
      await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
      });
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
  }
  catch (e) {
      console.log(e);
  }
};

start();