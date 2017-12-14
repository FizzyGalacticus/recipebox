let mongoose = require('mongoose');
mongoose.Promise = Promise;

let recipeModel = mongoose.Schema({
	name: {type: String, required: true},
	picture: {type: String, default: 'temprecipe.jpeg'},
	ingredients: [
		{
			ingredientId: {type: String, required: true},
			measurementId: {type: String},
			amount: {type: String, required: true},
		},
	],
	instructions: [],
	notes: String,
	prepTime: String,
	totalTime: {type: String, required: true},
	serves: String,
	dateAdded: {type: Date, default: Date.now()},
	authorId: {type: String, required: true},
});

module.exports = mongoose.model('RecipeModel', recipeModel);
