const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });

    if (!user) {
      const salt = uid2(16);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const token = uid2(64);

      const newUser = new User({
        email: req.fields.email,
        username: req.fields.username,
        token: token,
        hash: hash,
        salt: salt,
      });
      console.log(newUser);

      await newUser.save();
      let userProfile = {
        id: newUser.id,
        username: newUser.username,
        token: newUser.token,
      };
      res.status(200).json(userProfile);
    } else {
      res.status(409).json({ message: "this email already has an account" });
    }
  } catch (error) {
    res.status(400).json({ message: "requête invalide" });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.fields.email });

    const newHash = SHA256(req.fields.password + user[0].salt).toString(
      encBase64
    );

    let userProfile = {
      id: user[0].id,
      username: user[0].username,
      token: user[0].token,
    };
    console.log(newHash);

    if (newHash === user[0].hash) {
      res.status(200).json(userProfile);
    } else {
      res.status(400).json({ message: "accès refusé" });
    }
  } catch (error) {
    res.status(400).json({ message: "requête invalide" });
  }
});

router.post("/user/add-fav", async (req, res) => {
  try {
    if (req.fields.id) {
      const user = await User.findById(req.fields.id);
      user.favorites.push(req.fields.newfav);
      await user.save();

      res.json(user);
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/user/profile", async (req, res) => {
  try {
    if (req.query.id) {
      const user = await User.findById(req.query.id);
      res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        favorites: user.favorites,
      });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
