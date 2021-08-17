const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my gamepad project" });
});

const frontPageRoute = require("./routes/frontPage");
app.use(frontPageRoute);

app.all("*", (req, res) => {
  res.status(400).json({ message: "page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
