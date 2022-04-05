const express = require('express');

const router = express.Router();

// import user controllers
const orderControllers = require("../controllers/orderControllers");

const auth = require("../auth");
const {verify, verifyAdmin} = auth;

// Routes
// Create Order
router.post("/", verify, orderControllers.order);

// Add Product To Orders
router.post("/addToOrder", verify, orderControllers.addToOrder);


module.exports = router;