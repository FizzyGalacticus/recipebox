import React, {Component} from 'react';

import RecipesStateless from './RecipesStateless';
import {socket} from 'SocketIO';

export default class RecipesContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipes: [],
		};

		this.loadRecipe = this.loadRecipe.bind(this);
	}

	componentWillMount() {
		console.log('Recipes: willMount');
		socket.emit('getRecipe', {});
	}

	componentDidMount() {
		console.log('Recipes: didMount');
		socket.on('getRecipe', (response) => {
			// console.log(response.recipes[0]);
			this.setState({
				recipes: response.recipes,
			});
		});
	}

	componentDidCatch(error, info) {
		console.log(info);
		console.log(error);
	}

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
