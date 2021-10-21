const express = require("express");
const router = express.Router();
const login = "login";
const password = "haslo";

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Logowanie" });
});

router.post("/login", (req, res) => {
  const { body } = req;
  console.log(req.body);
  if (body.login === login && body.password === password) {
    req.session.admin = 1;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
