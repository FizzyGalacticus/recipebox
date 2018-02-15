import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Jumbotron } from 'react-bootstrap';

export default function RecipesStateless(props) {
	return (
		<div>
		{	
			props.recipes != {}
			?	
				<div>
				{ props.recipes.map( (r) => {
					return (
						<Jumbotron 
							className='recipeCard' 
							onClick={() => {props.loadRecipe(r._id)}}>
							<span>
								<h2>{ r.name }</h2>
							</span>
							<span className="recipeCard-time">
								{ r.totalTime }
							</span>
						</Jumbotron>
					)
				})}
				</div>
			:
				<div>Error</div>
		}
		</div>
	)
}