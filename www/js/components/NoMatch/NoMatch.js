import React, { Component } from 'react';

export default class NoMatch extends Component {
	render() {
		console.log(this.props.location.pathname);
		return (
			<div>
				<h1>Page Not Found</h1>
				<p>
				I'm sorry, the page you were looking for was not found.
				Perhaps you would like to go <a href="/">Home</a>?
				</p>
			</div>
		);
	}
}