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

// Get User Order
router.get("/getUserOrder", verify, orderControllers.getUserOrder);

// Get All Orders
router.get("/getAllOrders", verify, verifyAdmin, orderControllers.getAllOrders);

// Delete Order
router.delete("/cancelOrder/:id", verify, orderControllers.cancelOrder);

// Delete Product From Order
router.delete("/removeFromOrder/:id", verify, orderControllers.removeFromOrder);

// Pay Order
router.put("/pay/:id", verify, orderControllers.payOrder);

// Get All Paid Orders
router.get("/paidOrders", verify, verifyAdmin, orderControllers.paidOrders);

// Get All Pending Orders
router.get("/pendingOrders", verify, verifyAdmin, orderControllers.pendingOrders);

module.exports = router;