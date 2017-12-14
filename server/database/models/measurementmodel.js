let mongoose = require('mongoose');
mongoose.Promise = Promise;

let measurementModel = mongoose.Schema({
	name: {type: String, required: true},
});

module.exports = mongoose.model('MeasurementModel', measurementModel);
