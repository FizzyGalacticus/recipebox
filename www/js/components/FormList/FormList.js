import { Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, ListGroup, ListGroupItem, FormControl, Button} from 'react-bootstrap';
import DragableList from '../DragableList';

export default class FormList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			listItems: this.props.listItems,
			enterItemValue: '',
		};

		this.handleNewItemChange = this.handleNewItemChange.bind(this);
		this.addNewItem = this.addNewItem.bind(this);
	}

	componentWillMount() {
		// console.log('FormList willMount');
	}

	componentDidMount() {
		// console.log('FormList didMount');
	}

	handleNewItemChange(e) {
		this.setState({
			enterItemValue: e.target.value,
		});
	}

	addNewItem(e) {
		this.setState({
			listItems: [...this.state.listItems, this.state.enterItemValue],
			enterItemValue: '',
		});

		// this.props.onChange([this.state.listItems]);
	}

	render() {
		return (
			<Grid>
				<Row>
					<Col xs={12} sm={12} md={12} lg={12}>
						<ListGroup>
							<DragableList listItems={this.state.listItems} />
							
							<ListGroupItem>
								<Row>
									<Col xs={6} sm={6} md={6} lg={6}>
										<FormControl
											type='text'
											value={this.state.enterItemValue}
											placeholder='Add new item'
											onChange={this.handleNewItemChange} />
									</Col>
									<Col xs={6} sm={6} md={6} lg={6}>
										<Button onClick={this.addNewItem}>+</Button>
									</Col>
								</Row>
							</ListGroupItem>
						</ListGroup>
					</Col>
				</Row>
			</Grid>
		);
	}
}

FormList.defaultProps = {
	listItems: [],
	onChange: e => null,
};