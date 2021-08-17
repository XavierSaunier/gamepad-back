const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/devs", async (req, res) => {
  try {
    let page = req.query.page;
    let page_size = req.query.page_size;

    const response = await axios.get(
      `https://api.rawg.io/api/developers?key=${process.env.GAMEPAD_API_KEY}&page=${page}&page_size=${page_size}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
