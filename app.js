const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const evaluator = require("./evaluator").postEvaluate;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res, next) => {
  res.render("home");
});

app.post("/evaluate", evaluator);

app.listen(3000);
