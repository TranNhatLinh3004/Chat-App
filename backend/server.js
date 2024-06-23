var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var chatRouter = require("./routes/chat");

var app = express();

app.use(
    cors({
        origin: "http://localhost:3001",
        Credential: true,
    })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/chat", chatRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server started on port 5000");
});
module.exports = app;