const express = require("express");
const router = express.Router();

router.get("/blogs", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api test ok",
  });
});

module.exports = router;