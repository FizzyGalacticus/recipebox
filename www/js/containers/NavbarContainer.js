import { Component } from 'react';

import Navbar from '../components/Navbar';

export default class NavbarContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: '',
		}

		this.setActive = this.setActive.bind(this);
	}

	componentWillMount() {
		console.log('Navbar: componentWillMount');
		
		this.setState({
			active: window.location.pathname.split('/')[1]
		});
	}

	componentWillUnmount() {
		console.log('Navbar: componentWillUnmount')
	}

	componentDidCatch(error, info) {
		console.log(info);
		console.log(error);
	}

	setActive(lc,url) {
		console.log('Navbar: setActive');

		this.setState({
			active: lc
		}, () => {
			window.location.hash = `#${url}`;
		});

	}

	render() {
		console.log('Navbar: rendering');

		return (
			<Navbar 
				id='recipebox-navbar'
				links={this.props.links} 
				active={this.state.active}
				click={this.setActive}
				setActive={this.setActive}
			/>
		);
	}
}