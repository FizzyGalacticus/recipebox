import React from 'react';
import FormList from '../FormList';

export default function NewRecipeStateless(props) {
	return (
		<div>
			<form id="newRecipeForm" action="post" onSubmit={props.submit}>
				<FormList updateArray={() => this.updateArray([])} />
				<label value="Name">
					<input type="text" name="name"/>
				</label>
				<input type="text" name="2"/>
				<button>Save</button>
			</form>
		</div>
	)
}