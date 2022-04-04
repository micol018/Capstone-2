const express = require('express');

const router = express.Router();

// import user controllers
const productControllers = require("../controllers/productControllers");

const auth = require("../auth");
const {verify, verifyAdmin} = auth;

// Routes
// Add Product
router.post("/", verify, verifyAdmin, productControllers.addProduct);

// Get All Products
router.get("/", productControllers.getAllProducts);

// Get Single Product Details
router.get("/:id", productControllers.getSingleProduct);

module.exports = router;