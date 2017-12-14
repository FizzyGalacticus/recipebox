let mongoose = require('mongoose');
mongoose.Promise = Promise;

let ingredientModel = mongoose.Schema({
	name: {type: String, required: true},
	isRecipe: {type: Boolean, required: true, default: false},
	recipeId: {type: String},
});

module.exports = mongoose.model('IngredientModel', ingredientModel);
