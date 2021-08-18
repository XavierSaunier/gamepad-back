const express = require("express");
const router = express.Router();
const axios = require("axios");

//dev frontpage
router.get("/devs", async (req, res) => {
  try {
    let page = req.query.page;
    if (page === undefined) {
      page = 1;
    }
    let page_size = req.query.page_size;
    if (page_size === undefined) {
      page_size = 10;
    }

    const response = await axios.get(
      `https://api.rawg.io/api/developers?key=${process.env.GAMEPAD_API_KEY}&page=${page}&page_size=${page_size}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//dev details

router.get("/devs/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/developers/${req.params.id}?key=${process.env.GAMEPAD_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//creators page
router.get("/creators", async (req, res) => {
  try {
    let page = req.query.page;
    if (page === undefined) {
      page = 1;
    }
    let page_size = req.query.page_size;
    if (page_size === undefined) {
      page_size = 10;
    }

    const response = await axios.get(
      `https://api.rawg.io/api/creators?key=${process.env.GAMEPAD_API_KEY}&page=${page}&page_size=${page_size}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
