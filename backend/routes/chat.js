var express = require("express");
const chats = require("../data/data");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.send(chats);
});

router.get("/:id", function(req, res, next) {
    const singleChat = chats.find((chat) => chat._id == req.params.id);
    res.send(singleChat);
});

module.exports = router;