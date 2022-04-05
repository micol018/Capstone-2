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

// Set User As Admin
router.put("/updateAdmin/:id", verify, verifyAdmin, userControllers.updateAdmin);

// Get All Users
router.get("/", verify, verifyAdmin, userControllers.getAllUsers);

// Get Single User
router.get("/:id", verify, verifyAdmin, userControllers.getSingleUser);

// Get Logged In User Details
router.get("/getUserDetails", verify, userControllers.getUserDetails);

// Update Logged In User Details
router.put("/updateUserDetails", verify, userControllers.updateUserDetails);

// Delete A User
router.delete("/deleteUser/:id", verify, verifyAdmin, userControllers.deleteUser);

module.exports = router;