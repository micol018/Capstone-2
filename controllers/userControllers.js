// import bcrypt module
const bcrypt = require("bcrypt");

// import User model
const User = require("../models/User");

// import auth module
const auth = require("../auth");

// Controllers
// User Registration
module.exports.registerUser = (req, res) => {

	console.log(req.body);

	const hashedPW = bcrypt.hashSync(req.body.password, 10);

	let newUser = new User({

		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hashedPW,
		mobileNo: req.body.mobileNo,
	})

	newUser.save()
	.then(user => res.send(user))
	.catch(err => res.send("Email Already Taken"));
};

// Log In
module.exports.loginUser = (req, res) => {

	console.log(req.body);

	User.findOne({email:req.body.email})
	.then(foundUser => {

		if(foundUser === null){

			return res.send("User does not exist");

		}else{

			const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)

			if(isPasswordCorrect){

				return res.send({accessToken: auth.createAccessToken(foundUser)})
			}else{

				return res.send("Password is incorrect")
			}
		}
	})
	.catch(err => res.send(err));
};

// Set User As Admin
module.exports.updateAdmin = (req, res) => {

	let updates = {
		isAdmin: true
	}

	User.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedUser => res.send(updatedUser))
	.catch(err => res.send(err));
};

// Get All Users
module.exports.getAllUsers = (req, res) => {

	User.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// Get Single User Details by Admin 
module.exports.getSingleUser = (req, res) => {

	User.findById(req.params.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// Get Logged In User Details
module.exports.getUserDetails = (req, res) => {

	User.findById(req.user.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// Update Logged In User Details
module.exports.updateUserDetails = (req, res) => { 

	let updates = {

		firstName: req.body.firstName,
		lastName: req.body.lastName,
		mobileNo: req.body.mobileNo
	}

	User.findByIdAndUpdate(req.user.id, updates, {new: true})
	.then(updatedUser => res.send(updatedUser))
	.catch(err => res.send(err));
};

// Delete A User
module.exports.deleteUser = (req, res) => {

	User.findByIdAndDelete(req.params.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));
};