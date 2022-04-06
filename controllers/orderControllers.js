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
		userId: req.user.id
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
			productId: req.body.productId,
			productName: req.body.productName,
			price: req.body.price
		}

		order.products.push(newProduct);

		return order.save()
		.then(order => res.send(order))
		.catch(err => res.send(err));
	});

	
};

// Get User Order
module.exports.getUserOrder = (req, res) => {

	Order.findOne({userId: req.user.id})
	.then(result => {
		if(result.length === 0){
			return res.send("No orders found")
		}else{
			return res.send(result)
		}
	})
	.catch(err => res.send(err));
};

// Get All Orders
module.exports.getAllOrders = (req, res) => {

	Order.find({})
	.then(result => {
		if(result.length === 0){
			return res.send("No orders found")
		}else{
			return res.send(result)
		}
	})
	.catch(err => res.send(err));
};

// Delete Order
module.exports.cancelOrder = (req, res) => {

	Order.findByIdAndDelete(req.params.id)
	.then(result => res.send({message: 'Order Deleted'}))
	.catch(err => res.send(err));
};

// Delete Product from Order
module.exports.removeFromOrder = (req, res) => {

	Order.findOne({userId: req.user.id})
	.then(order => {

		order.products.splice(order.products.findIndex(i => {
			return i.productId === req.params.id
		}), 1);

		return order.save()
		.then(order => res.send(order))
		.catch(err => res.send(err));
	});
};

// Pay Order
module.exports.payOrder = (req, res) => {

	let updates = {
			status: "Paid"
		}

	Order.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedOrder => res.send(updatedOrder))
	.catch(err => res.send(err));
};

// Get All Paid Orders
module.exports.paidOrders = (req, res) => {

	Order.find({status: "Paid"})
	.then(result => {
		if(result.length === 0){
			return res.send("No orders found")
		}else{
			return res.send(result)
		}
	})
	.catch(err => res.send(err));
};

// Get All Unpaid Orders
module.exports.pendingOrders = (req, res) => {

	Order.find({status: "Pending"})
	.then(result => {
		if(result.length === 0){
			return res.send("No orders found")
		}else{
			return res.send(result)
		}
	})
	.catch(err => res.send(err));
};