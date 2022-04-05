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
			}
		}
	],

	totalAmount: {
		type: Number,
		required: [true, "Total Amount is required"]
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