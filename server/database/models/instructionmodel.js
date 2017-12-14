let mongoose = require('mongoose');
mongoose.Promise = Promise;

let instructionModel = mongoose.Schema({
	text: {type: String, required: true},
	number: {type: Number, required: true},
});

module.exports = mongoose.model('InstructionModel', instructionModel);
