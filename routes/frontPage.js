const express = require("express");
const router = express.Router();
const axios = require("axios");

//frontpage
router.get("/games", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.GAMEPAD_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//gamePage
router.get("/games/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}?key=${process.env.GAMEPAD_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//game caps
router.get("/games/:id/screenshots", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}/screenshots?key=${process.env.GAMEPAD_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DLC and other bonuses
router.get("/games/:id/additions", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}/additions?key=${process.env.GAMEPAD_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//trailer
router.get("/games/:id/movies", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.params.id}/movies?key=${process.env.GAMEPAD_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
