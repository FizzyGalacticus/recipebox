import {Component} from 'react';

import {Row} from 'react-bootstrap';
import UniCol from 'components/UniCol';

export default class NewRecipe extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Row>
				<UniCol size={2}>
					<div>Image Selector Here</div>
				</UniCol>
				<UniCol size={10}>
					<div>Form fields here</div>
				</UniCol>
			</Row>
		);
	}
};
