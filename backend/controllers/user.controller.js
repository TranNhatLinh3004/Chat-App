const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { token } = require("morgan");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
        res.status(404);
        throw new Error("Please add all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create the user");
    }
});

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email,
    });

    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const getUser = asyncHandler(async(req, res) => {
    const { id } = req.params;

    const user = await User.findById({
        _id: id,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

const allUsers = asyncHandler(async(req, res) => {
    const keyword = req.query.search ?
        {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        } :
        {};

    const users = await User.find(keyword);
    res.json(users);
});

module.exports = { registerUser, loginUser, getUser, allUsers };