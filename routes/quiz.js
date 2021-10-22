const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

/* GET home page. */
router.get("/", (req, res, next) => {
  const show = !req.session.vote;
  Quiz.find({}, (err, data) => {
    // console.log(data);

    res.render("quiz", { title: "Quiz", data, show });
  });
});

router.post("/", (req, res, next) => {
  const id = req.body.quiz;
  Quiz.findOne({ _id: id }, (err, answer) => {
    answer.vote++;

    answer.save(err => {
      req.session.vote = 1;
      res.redirect("/quiz");
    });
  });
});

module.exports = router;
