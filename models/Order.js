const mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({

	userId: {
		type: String,
		required: [true, "User ID is required"]
	},

	products: [
		{
			productId: {
				type: String,
				required: [true, "Product ID is required"]
			},
			productName: {
				type: String
			},
			price: {
				type: Number,
				required: [true, "Price is required"]
			}
		}
	],

	totalAmount: {
		type: Number,
		default: 0
	},

	status: {
		type: String,
		default: "Pending"
	},
	
	purchasedOn: {
		type: Date,
		default: new Date()
	}

})

module.exports = mongoose.model("Order", orderSchema);