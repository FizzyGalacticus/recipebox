import React, {Component} from 'react';

export default class SampleComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>{this.props.msg}</p>
			</div>
		);
	}
}