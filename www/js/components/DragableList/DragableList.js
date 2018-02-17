import * as React from "react";
import * as ReactDOM from 'react-dom';
import Dragula from 'react-dragula';
import {Grid, Row, Col, ListGroup, ListGroupItem, FormControl, Button} from 'react-bootstrap';

function DragableListStateless(props) {
	return (
    	<div className='container' ref={props.dragulaDecorator}>
        	{props.listItems.map((item, index) => {
        		console.log(item,index);
				return <ListGroupItem key={index}>{index + 1}. {item}</ListGroupItem>;
			})}
        </div>
    );
}

class DragableList extends React.Component {

	dragulaDecorator(componentBackingInstance) {
		if(componentBackingInstance) {
			let options = {};
			Dragula([componentBackingInstance],options);
		}
	}

	render() {
		return (
	    	<DragableListStateless 
	    		dragulaDecorator={this.dragulaDecorator}
	    		listItems={this.props.listItems} />
	    );
	}
}

export default DragableList;