import {Component} from 'react';
import {Dragula as dragula} from 'react-dragula';
import {ListGroupItem} from 'react-bootstrap';

function DragableListStateless(props) {
	return (
		<div className='container' ref={props.dragulaDecorator}>
			{
				props.listItems.map((item, index) => {
					return <ListGroupItem key={index}>{index + 1}. {item}</ListGroupItem>;
				})
			}
		</div>
	);
}

class DragableList extends Component {
	dragulaDecorator(componentBackingInstance) {
		if(componentBackingInstance) {
			const options = {};
			dragula([componentBackingInstance], options);
		}
	}

	render() {
		return (
			<DragableListStateless
				dragulaDecorator={this.dragulaDecorator}
				listItems={this.props.listItems}
			/>
		);
	}
}

export default DragableList;
