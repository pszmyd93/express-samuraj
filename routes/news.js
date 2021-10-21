const express = require("express");
const router = express.Router();
const News = require("../models/News");

/* GET home page. */
router.get("/", (req, res, next) => {
  const searched = req.query.search || "";

  const findNews = News.find({ title: new RegExp(searched.trim(), "i") }).sort({ created: -1 }); // sortowanie malejące, metody mongoose a nie js, trim żeby można było dać spację na początku

  findNews.exec((err, data) => {
    res.render("news", { title: "News", data, searched });
  });
});

module.exports = router;
