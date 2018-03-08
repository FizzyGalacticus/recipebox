import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import SampleComponent from './components/SampleComponent';
import NoMatch from './components/NoMatch';

import Navbar from './components/Navbar';

import Recipe from './components/Recipe';
import Recipes from './components/Recipes';
import NewRecipe from './components/NewRecipe';

import { ROUTES } from './routes.js'


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
			<BrowserRouter>
				<div>
					<Navbar links={ROUTES} />

					<div className='container'>
					<Switch>
						{ROUTES.map( (link,i) => {
							return (
								<Route 
									key={i}
									path={link.href} 
									component={link.component} />
							);
						})}
						
						<Redirect exact from="/" to="/home" />
						<Route component={NoMatch} />
					</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout />, app);