import React, {Component} from 'react';

import RecipesStateless from './RecipesStateless';

export default class RecipesContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipes: [],
		};

		this.loadRecipe = this.loadRecipe.bind(this);
	}

	componentWillMount() {}

	componentDidMount() {}

	componentDidCatch(error, info) {}

	loadRecipe(recipeID) {
		window.location.hash = `#/recipe/${recipeID}`;
		// console.log("recipe " + recipeID);
	}

	render() {
		return (
			<RecipesStateless
				recipes={this.state.recipes}
				loadRecipe={this.loadRecipe}
			/>
		);
	}
};
