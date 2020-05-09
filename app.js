const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const startRouter = require("./start.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", startRouter);

app.listen(4000, () => {
  console.log(
    "================================================================"
  );
});
