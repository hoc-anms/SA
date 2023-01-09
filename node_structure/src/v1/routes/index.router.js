const express = require("express");
const router = express.Router();
// const apiKey = {};

// router.use(apiKey);

router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api ok",
  });
});

router.use('/v1', require('./blogs'))

module.exports = router;
