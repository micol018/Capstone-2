const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

// Create Order
module.exports.order = async (req, res) => {

	console.log(req.user.id);

	if(req.user.isAdmin){
		return res.send("Action Forbidden");
	};

	let newOrder = new Order({
		userId: req.user.id,
	})


	newOrder.save()
	.then(order => res.send({message: 'You have successfully created an order'}))
	.catch(err => res.send(err));
};

// Add Order
module.exports.addToOrder = (req, res) => {

	if(req.user.isAdmin){
		return res.send("Action Forbidden");
	};

	Order.findOne({userId: req.user.id})
	.then(order => {
		let newProduct = {
			productId: req.body.productId
		}

		order.products.push(newProduct);

		return order.save()
		.then(order => res.send(order))
		.catch(err => res.send(err));
	});
	
};

