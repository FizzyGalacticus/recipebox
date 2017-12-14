import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MenuBar from './components/MenuBar';
import SampleComponent from './components/SampleComponent';
import NoMatch from './components/NoMatch';

let socket = io(`https://localhost`);

socket.on('getRecipe', (response) => {
	console.log(response);
});

socket.on('getInstruction', (response) => {
	console.log(response);
});

socket.on('getIngredient', (response) => {
	console.log(response);
});

socket.on('getMeasurement', (response) => {
	console.log(response);
});

socket.on('getUser', (response) => {
	console.log(response);
});

socket.emit('getRecipe');
socket.emit('getInstruction');
socket.emit('getIngredient');
socket.emit('getMeasurement');
socket.emit('getUser');

class Layout extends Component {
	render() {
		const MenuBarWrapper = props => {
			return (
				<MenuBar title="Blank React App" />
			);
		}

		const SampleComponentWrapper = props => {
			return (
				<SampleComponent
					msg="hello world from reactJS"
					{...props}
				/>
			);
		}

		return (
			<Router>
				<div className='containter content-container' >
					<MenuBarWrapper title="Black React App" />

					<Switch>
						<Route path="/home" component={SampleComponentWrapper} />
						<Redirect exact from="/" to="/home" />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout />, app);