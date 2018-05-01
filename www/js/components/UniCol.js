import {Component} from 'react';
import {Col} from 'react-bootstrap';

/**
 * A component wrapper around Bootstrap's
 * Col component which makes all sizes
 * equal.
 * @class UniCol
 * @extends React.Component
 */
class UniCol extends Component {
	/**
	 * @constructor
	 * @param {object} props
	 */
	constructor(props) {
		super(props);
	}

	/**
	 * @return {React.Component}
	 */
	render() {
		return (
			<Col
				{...this.props}
				xs={this.props.size}
				sm={this.props.size}
				md={this.props.size}
				lg={this.props.size}
				className={this.props.className}
			>
				{this.props.children}
			</Col>);
	}
}

UniCol.defaultProps = {
	size: 12,
};

export default UniCol;
