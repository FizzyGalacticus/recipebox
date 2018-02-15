import React, { Component } from 'react';

import NewRecipeStateless from './NewRecipeStateless.js';

// import formToJSON from '../lib.js';

// formToJSON = elements => [].reduce.call(elements, (data, element) => {
//   data[element.name] = element.value;
//   return data;
// }, {});

// function formToJSON(elements) {
// 	[].reduce.call(elements, (data,element) => {
// 		data[element.name] = element.value;
// 		return data;
// 	},{})
// }

export default class NewRecipeContainer extends Component {
	constructor(props) {
		super(props);

		this.submit = this.submit.bind(this);
		this.updateRecipeArray = this.updateRecipeArray.bind(this);
	}

	componentWillMount() {
		console.log('NewRecipe: willMount');
		// this.props.socket.emit('getRecipe',{'_id': this.state.recipeID});
	}

	componentDidMount() {
		console.log('NewRecipe: didMount');
		// this.props.socket.on('getRecipe', (response) => {
		// 	// console.log(response.recipes[0]);
		// 	this.setState({
		// 		recipe: response.recipes[0]
		// 	});
		// });
	}

	submit(event) {
		event.preventDefault();
		console.log(event);
		// let form = document.getElementById('newRecipeForm')[0];
		// console.log(formToJSON(form.elements));
		// document.getElementById('newRecipeForm');
	}

	componentDidCatch(error, info) {
		console.log(info);
		console.log(error);
	}

	updateRecipeArray(listObject){
		this.setState(listObject);
	}

	render() {
		console.log('NewRecipe: rendering');
		return (
			<NewRecipeStateless 
				submit={this.submit}
				updateArray={this.updateArray}
			/>
		)
	}
}