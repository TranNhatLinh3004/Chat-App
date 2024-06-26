var express = require("express");
var router = express.Router();
const {
    registerUser,
    loginUser,
    allUsers,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/authMiddleware");
/* GET users listing. */

/* GET users listing. */
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", protect, allUsers);


module.exports = router;