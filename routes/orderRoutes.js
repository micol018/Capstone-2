const express = require('express');

const router = express.Router();

// import user controllers
const orderControllers = require("../controllers/orderControllers");

const auth = require("../auth");
const {verify, verifyAdmin} = auth;

// Routes


module.exports = router;