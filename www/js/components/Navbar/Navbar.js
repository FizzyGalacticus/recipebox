import {Component} from 'react';

import NavbarStateless from './NavbarStateless';

export default class NavbarContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: '',
		};

		this.setActive = this.setActive.bind(this);
	}

	componentWillMount() {
		this.setState({
			active: window.location.pathname.split('/')[1],
		});
	}

	componentWillUnmount() {}

	componentDidCatch(error, info) {}

	setActive(lc) {
		this.setState({
			active: lc,
		});
	}

	render() {
		return (
			<NavbarStateless
				id='recipebox-navbar'
				links={this.props.links}
				active={this.state.active}
				click={this.setActive}
				setActive={this.setActive}
			/>
		);
	}
};
