const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, "First Name is required"]
	},

	description: {
		type: String,
		required: [true, "Last Name is required"]
	},

	price: {
		type: Number,
		required: [true, "Email is required"]
	},

	isActive: {
		type: Boolean,
		default: true
	},

	createdOn: {
		type: Date,
		default: new Date()
	}

})

module.exports = mongoose.model("Product", productSchema);