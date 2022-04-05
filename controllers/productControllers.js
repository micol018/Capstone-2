const Product = require("../models/Product");

// Add Product
module.exports.createProduct = (req, res) => {

	console.log(req.body);

	let newProduct = new Product({

		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category
	})

	newProduct.save()
	.then(product => res.send(product))
	.catch(err => res.send(err));
};

// Get All Products
module.exports.getAllProducts = (req, res) => {

	Product.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// Get Single Product
module.exports.getSingleProduct = (req, res) => {

	console.log(req.params);
	
	Product.findById(req.params.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// Update Product
module.exports.updateProduct = (req, res) => {

	console.log(req.params.id);
	console.log(req.body);

	let updates = {

		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category

	}

	Product.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedProduct => res.send(updatedProduct))
	.catch(err => res.send(err));
};

// Archive Product
module.exports.archiveProduct = (req, res) => {

	console.log(req.params.id);

	let updates = {
		isActive: false
	}

	Product.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedProduct => res.send(`${updatedProduct.name} Product is archived.`))
	.catch(err => res.send(err));
};

// Activate Product
module.exports.activateProduct = (req, res) => {

	console.log(req.params.id);

	let updates = {
		isActive: true
	}

	Product.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedProduct => res.send(`${updatedProduct.name} Product is activated.`))
	.catch(err => res.send(err));
};

// Get Active Courses
module.exports.getActiveProducts = (req, res) => {

	Product.find({isActive: true})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// Get Inactive Courses
module.exports.getInactiveProducts = (req, res) => {

	Product.find({isActive: false})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// Delete A Product
module.exports.deleteProduct = (req, res) => {

	Product.findByIdAndDelete(req.params.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

