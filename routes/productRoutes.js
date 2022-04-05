const express = require('express');

const router = express.Router();

// import user controllers
const productControllers = require("../controllers/productControllers");

const auth = require("../auth");
const {verify, verifyAdmin} = auth;

// Routes
// Create Product
router.post("/", verify, verifyAdmin, productControllers.createProduct);

// Get All Products
router.get("/", productControllers.getAllProducts);

// Get Single Product
router.get("/getSingleProduct/:id", productControllers.getSingleProduct);

// Update Product
router.put("/:id", verify, verifyAdmin, productControllers.updateProduct);

// Archive Course
router.put("/archive/:id", verify, verifyAdmin, productControllers.archiveProduct);

// Activate Course
router.put("/activate/:id", verify, verifyAdmin, productControllers.activateProduct);

// Get All Active Courses
router.get("/getActiveProducts", productControllers.getActiveProducts);

// Get Inactive Course
router.get("/getInactiveProducts", verify, verifyAdmin, productControllers.getInactiveProducts);

// Delete A Product
router.delete("/deleteProduct/:id", verify, verifyAdmin, productControllers.deleteProduct);


module.exports = router;