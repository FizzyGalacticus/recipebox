import React, { Component } from 'react';

export default function Instruction(props) {
	return (
		<div>
			{
				props.instruction != {}
				?
					<div>
						
					</div>
				:
					<div>Error</div>
			}
		</div>
	);
}