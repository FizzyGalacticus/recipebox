import SampleComponent from './components/SampleComponent';
import Recipe from './components/Recipe';
import Recipes from './components/Recipes';
import NewRecipe from './components/NewRecipe';

export const ROUTES = [
	{
		'title':'Home',
		'href':'/home',
		'component': (props) => {
			return (
				<SampleComponent
					msg="hello world, this is a placeholder for a home page"
					{...props}
				/>
			);
		}
	},
	{
		'title':'Recipe',
		'href':'/recipe/:recipeID',
		'display': false,
		'component': (props) => {
			return (
				<Recipe
					{...props}
				/>
			)
		}
	},
	{
		'title':'Recipes',
		'href':'/recipes',
		'component': (props) => {
			return (
				<Recipes
					{...props}
				/>
			)	
		}
	},
	{
		'title':'New Recipe',
		'href':'/new-recipe',
		'component': (props) => {
			return (
				<NewRecipe 
					{...props}
				/>
			)
		}
	}
];