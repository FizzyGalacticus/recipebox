import React, { Component } from 'react';

import RecipeStateless from './RecipeStateless';
import { socket } from '../../SocketIO';

export default class RecipeContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipe: {},
			recipeID: this.props.match.params.recipeID
		}
	}

	componentWillMount() {
		console.log('RecipeContainer willMount');
		socket.emit('getRecipe',{'_id': this.state.recipeID});
	}

	componentDidMount() {
		console.log('RecipeContainer didMount');
		socket.on('getRecipe', (response) => {
			this.setState({
				recipe: response.recipes[0]
			});
		});
	}

	render() {
		return (
			<RecipeStateless
				recipe={this.state.recipe}
			/>
		)
	}
}