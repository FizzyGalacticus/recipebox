import SampleComponent from 'components/Pages/SampleComponent';
import Recipe from 'components/Pages/Recipe';
import Recipes from 'components/Pages/Recipes';
import NewRecipe from 'components/Pages/NewRecipe';

export const ROUTES = [
	{
		'title': 'Home',
		'href': '/home',
		'component': (props) => {
			return (
				<SampleComponent
					msg="hello world, this is a placeholder for a home page"
					{...props}
				/>
			);
		},
	},
	{
		'title': 'Recipe',
		'href': '/recipe/:recipeID',
		'display': false,
		'component': (props) => {
			return (
				<Recipe
					{...props}
				/>
			);
		},
	},
	{
		'title': 'Recipes',
		'href': '/recipes',
		'component': (props) => {
			return (
				<Recipes
					{...props}
				/>
			);
		},
	},
	{
		'title': 'New Recipe',
		'href': '/new-recipe',
		'component': (props) => {
			return (
				<NewRecipe
					{...props}
				/>
			);
		},
	},
];
