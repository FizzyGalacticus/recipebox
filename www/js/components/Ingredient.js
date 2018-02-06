import React, { Component } from 'react';

export default function Ingredient(props) {
	return (
		<div>
			{
				props.ingredient != {}
				?
					<div>
						
					</div>
				:
					<div>Error</div>
			}
		</div>
	);
}