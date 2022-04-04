const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({

	productId: {
		type: String,
		required: [true, "Product ID is required"]
	},
	
	name: {
		type: String,
		required: [true, "Category Name is required"]
	},

	description: {
		type: String,
		required: [true, "Description is required"]
	}

})

module.exports = mongoose.model("Category", categorySchema);