import React, { Component } from 'react';

export default function NewRecipe(props) {
	return (
		<div>
			<form id="newRecipeForm" action="post" onSubmit={props.submit}>
				<FormList updateArray={this.updateArray} g/>
				<label value="Name">
					<input type="text" name="name"/>
				</label>
				<input type="text" name="2"/>
				<button>Save</button>
			</form>
		</div>
	)
}