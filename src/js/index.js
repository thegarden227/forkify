import Search from './models/search';
import * as searchView from './views/searchView';
import { selectedElements, renderLoader, clearLoader, hideLoader } from './views/base';


/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list objects
 * - Liked recipes
 */
const appState = {};
const controlSearh = async () => {
    //1) Get query from view
    const query = searchView.getInput(); //TODO 
    if (query) {
        //2) new search object and add to state
        appState.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(selectedElements.searchSpinnerParent);

        //4) Search for recipes
        await appState.search.getResults();

        //5) render results on UI
        // console.log("calling clear loader");
        // clearLoader();
        console.log("This place is to be clear.");
        hideLoader();
        searchView.renderResults(appState.search.result);
        console.log(appState.search.result);
      
    }
}
// console.log(selectedElements.searchForm);

selectedElements.searchForm.addEventListener('submit', 
    e=> {
        e.preventDefault();
        controlSearh();
    });



