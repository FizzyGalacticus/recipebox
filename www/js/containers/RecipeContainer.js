import React, { Component } from 'react';

import Recipe from '../components/Recipe';

export default class RecipeContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipe: {},
			recipeID: this.props.match.params.recipeID
		}
	}

	componentWillMount() {
		// console.log('RecipeContainer willMount');
		this.props.socket.emit('getRecipe',{'_id': this.state.recipeID});
	}

	componentDidMount() {
		// console.log('RecipeContainer didMount');
		this.props.socket.on('getRecipe', (response) => {
			// console.log(response.recipes[0]);
			this.setState({
				recipe: response.recipes[0]
			});
		});
	}

	render() {
		return (
			<Recipe
				recipe={this.state.recipe}
			/>
		)
	}
}