const path = require("path");
const { Router } = require("express");
const router = Router();

router.get("/books", (req, res) => {
  res.sendFile(booksPage);
});

module.exports = router;
