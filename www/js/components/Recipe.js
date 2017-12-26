import React, { Component } from 'react';

export default function Recipe(props) {
	return (
		<div>
		{
			props.recipe != {} 
			? 
				<div className='container'>
					<h2>{props.recipe.name}</h2>
					
					{ props.recipe.picture 
						? 
							<img src="{props.recipe.picture}" /> 
						: 
							null 
					}

					{ props.recipe.prepTime 
						? 
							<div>{props.recipe.prepTime}</div> 
						: 
							null 
					}

					<div>{ props.recipe.totalTime }</div>
					
					{ props.recipe.serves 
						? 
							<div>props.recipe.serves</div> 
						: 
							null 
					}

					{ props.recipe.ingredients
						? 
							props.recipe.ingredients.map( (item,i) => {
								<div key={i}>
									<span>{i}</span>
									<span>{item.measurementId}</span>
									<span>{item.amount}</span>
								</div>
							})
						:
							null
					}

					{ props.recipe.instructions
						?
							props.recipe.instructions.map( (item,i) => {
								<div key={i}>
									<span>{item.number}</span>
									<span>{item.text}</span>
								</div>
							})
						:
							null
					}

					{ props.recipe.notes 
						? 
							<div>{props.recipes.notes}</div> 
						: 
							null 
					}

				</div> 
			: 
				<div>Error</div>
		}
		</div>
	)
}