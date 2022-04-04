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
	.catch(err => res.send(err));
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

// See All Users
module.exports.seeAllUsers = (req, res) => {

	User.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};