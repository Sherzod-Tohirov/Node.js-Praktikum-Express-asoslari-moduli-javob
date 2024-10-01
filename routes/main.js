const express = require("express");
const path = require("path");
const { Router } = require("express");
const router = Router();

const mainFile = path.join(__dirname, "..", "views", "index.html");

router.get("/", (req, res) => {
  res.sendFile(mainFile);
});

module.exports = router;
