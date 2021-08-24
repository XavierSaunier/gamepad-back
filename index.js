const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const formidable = require("express-formidable");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my gamepad project" });
});

const frontPageRoute = require("./routes/frontPage");
app.use(frontPageRoute);
const devRoute = require("./routes/developers");
app.use(devRoute);
const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(400).json({ message: "page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
