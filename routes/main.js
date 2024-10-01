const { Router } = require("express");
const router = Router();

router.get("/", (_, res) => {
  res.send("Main page");
});

module.exports = router;
