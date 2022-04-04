const Product = require("../models/Product");

// Add Product
module.exports.addProduct = (req, res) => {

	console.log(req.body);

	let newProduct = new Product({

		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
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