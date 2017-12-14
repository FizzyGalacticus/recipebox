let mongoose = require('mongoose');
mongoose.Promise = Promise;

let userModel = mongoose.Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	username: {type: String, required: false},
	dateJoined: {type: Date, required: true, default: Date.now()},
	picture: {type: String, required: true, default: 'tempuser.jpeg'},
	firstName: String,
	lastName: String,
	phoneNumber: String,
});

module.exports = mongoose.model('UserModel', userModel);
