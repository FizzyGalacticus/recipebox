import React, { Component } from 'react';

import NavBar from '../components/NavBar';

export default class NavBarContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: '',
			isOpen: false
		}

		this.setActive = this.setActive.bind(this);
	}

	componentWillMount() {
		console.log('Navbar: componentWillMount');
		
		this.setState({
			active: window.location.pathname.split('/')[1]
		});
	}

	setActive(e) {
		console.log('Navbar: setActive');

		this.setState({
			active: (e.target.parentElement.id != '' ?  e.target.parentElement.id : e.target.id)
		});
	}

	render() {
		console.log('Navbar: rendering');

		return (
			<NavBar 
				id='recipebox-navbar'
				links={this.props.links} 
				active={this.state.active}
				click={this.setActive}
				setActive={this.setActive}
			/>
		);
	}
}