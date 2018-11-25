import Search from './models/search';
import * as searchView from './views/searchView';
import { selectedElements, renderLoader, clearLoader, hideLoader } from './views/base';
import recipe from './models/recipe';
import Recipe from './models/recipe';
import * as recipeView from './views/recipeView'

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list objects
 * - Liked recipes
 */
const appState = {};

// Search Controller

const controlSearh = async () => {
    //1) Get query from view
    let query = searchView.getInput(); //TODO 
    if (query) {
        //2) new search object and add to state
        appState.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(selectedElements.searchSpinnerParent);
        try {
            
            //4) Search for recipes
            await appState.search.getResults();
    
            //5) render results on UI
            // console.log("calling clear loader");
            // clearLoader();
            const newDate = new Date();
            console.log(`${newDate} is the date on which it is run.`);
            hideLoader();
            searchView.renderResults(appState.search.result);
            console.log(appState.search.result);
        } catch (error) {
            alert(`there is an error ${error}`);
            hideLoader();
        }
      
    }
}
// console.log(selectedElements.searchForm);

selectedElements.searchForm.addEventListener('submit', 
    e=> {
        e.preventDefault();
        controlSearh();
    });
//for testing
    window.addEventListener('load', 
    e=> {
        e.preventDefault();
        controlSearh();
    });

    selectedElements.searchResPages.addEventListener('click', e =>{
        const btn = e.target.closest('.btn-inline');
        if (btn) {
            const gotoPage = parseInt(btn.dataset.gotoPage, 10);
            searchView.clearResults();
            searchView.renderResults(appState.search.result, gotoPage);
            console.log(gotoPage);
        }
    })


// Recipe Controller
const controlRecipe = async () => {
    // Get Id from url
    const hashNumber = window.location.hash;
    const id = hashNumber.replace('#', '');

    if (id) {
        // prepare UI for changes
        renderLoader(selectedElements.recipe);
        // create new recipe object
        appState.recipe = new Recipe(id);
        window.r = appState.recipe;
        // get recipe data
        try {
            await appState.recipe.getRecipe();
            appState.recipe.parseIngredients();
    
            // calucate servings and time
            appState.recipe.cookingTime();
            appState.recipe.numOfServing();
            // reder recipe
            hideLoader();
            recipeView.renderRecipe(appState.recipe);
            
        } catch (error) {
            alert(`There is error ${error}`);
        
        }

    }
    console.log(id);
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
