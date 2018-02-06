import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import SampleComponent from './components/SampleComponent';
import NoMatch from './components/NoMatch';

import NavbarContainer from './containers/NavbarContainer';
import RecipeContainer from './containers/RecipeContainer';
import RecipesContainer from './containers/RecipesContainer';
import NewRecipeContainer from './containers/NewRecipeContainer';


var ROUTES = [
	{
		'title':'Home',
		'href':'/home',
		'component': (props) => {
			return (
				<SampleComponent
					msg="hello world, this is a placeholder for a home page"
					{...props}
				/>
			);
		}
	},
	{
		'title':'Recipe',
		'href':'/recipe/:recipeID',
		'display': false,
		'component': (props) => {
			return (
				<RecipeContainer
					{...props}
				/>
			)
		}
	},
	{
		'title':'Recipes',
		'href':'/recipes',
		'component': (props) => {
			return (
				<RecipesContainer
					{...props}
				/>
			)	
		}
	},
	{
		'title':'New Recipe',
		'href':'/new-recipe',
		'component': (props) => {
			return (
				<NewRecipeContainer 
					{...props}
				/>
			)
		}
	}
];


// socket.on('getRecipe', (response) => {
// 	console.log(response);
// });

// socket.on('getInstruction', (response) => {
// 	console.log(response);
// });

// socket.on('getIngredient', (response) => {
// 	console.log(response);
// });

// socket.on('getMeasurement', (response) => {
// 	console.log(response);
// });

// socket.on('getUser', (response) => {
// 	console.log(response);
// });

// socket.emit('getRecipe');
// socket.emit('getInstruction');
// socket.emit('getIngredient');
// socket.emit('getMeasurement');
// socket.emit('getUser');


class Layout extends Component {
	render() {
		return (
			<HashRouter>
				<div>
					<NavbarContainer links={ROUTES} />

					<div className='container'>
					<Switch>
						{ROUTES.map( (link,i) => {
							return (
								<Route 
									path={link.href} 
									component={link.component} />
							);
						})}
						
						<Redirect exact from="/" to="/home" />
						<Route component={NoMatch} />
					</Switch>
					</div>
				</div>
			</HashRouter>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout />, app);