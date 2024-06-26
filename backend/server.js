const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/database.config");
const chatRouter = require("./routes/chat");
const userRouter = require("./routes/users");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const colors = require("colors");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

// muốn xử lý các yêu cầu POST có nội dung JSON

app.use(bodyParser.urlencoded({ extended: true }));

// extended: true có nghĩa là các giá trị có thể là bất kỳ loại nào. Khi extended là false, các giá trị chỉ có thể là chuỗi hoặc mảng

app.use(
  cors({
    origin: "http://localhost:3001",
    Credential: true,
  })
);
require("dotenv").config();
connectDB();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.green.bold);
});
module.exports = app;
