import React from 'react';
import ReactDOM from 'react-dom';
import MenuBar from './components/MenuBar';

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

class Layout extends React.Component {
	render() {
		return (
			<div>
				<MenuBar title="Blank React App"></MenuBar>
				<div>{this.props.message}</div>
			</div>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout message="Hello world from ReactJS!" />, app);