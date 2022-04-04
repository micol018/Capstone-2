const express = require('express');

const router = express.Router();

// import user controllers
const userControllers = require("../controllers/userControllers");

const auth = require("../auth");
const {verify, verifyAdmin} = auth;

// Routes
// User Registration
router.post("/", userControllers.registerUser);

// Log In
router.post("/login", userControllers.loginUser);

// See All Users
router.get("/", verify, verifyAdmin, userControllers.seeAllUsers);


module.exports = router;