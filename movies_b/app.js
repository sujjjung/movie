const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();

// 미들웨어 설정
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

// MongoDB 연결
mongoose.connect("mongodb://localhost:27017/movieDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;