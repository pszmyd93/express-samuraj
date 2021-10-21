const express = require("express");
const News = require("../models/News");

const router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }
  next();
});

router.get("/", (req, res, next) => {
  News.find({}, (err, objects) => {
    console.log(objects);
    res.render("admin/index", { title: "Admin", objects });
  });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Admin", errors: {}, body: {} });
});

router.post("/news/add", (req, res) => {
  const { body } = req;

  const newsData = new News(body);
  const errors = newsData.validateSync();
  console.log(errors);

  newsData.save(err => {
    if (err) {
      res.render("admin/news-form", { title: "Dodaj news", errors, body });
      return;
    } else {
      res.redirect("/admin");
    }
    console.log(err);
  });
});

router.get("/news/delete/:id", (req, res) => {
  News.findByIdAndDelete(req.params.id, err => {
    res.redirect("/admin");
  });
});

module.exports = router;
