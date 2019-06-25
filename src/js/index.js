import Search from "./models/Search";
import * as searchView from './views/SearchView';
import {elements, renderLoader, clearLoader} from  "./views/base";

/*
Gloabal State of the App
    - Search object
    - Current recipe object
    - Shopping lisg object
    - Liked recipes
*/

const state = {};

const controlSearch = async () => {

    //1. get query from view
    const query = searchView.getInput();


    if(query){

        //2. new search object and add to state
        state.search = new Search(query);

        //3. prepare UI for result 
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //4. search for recipes
        await state.search.getResults();

        //5. render results on UI
        // console.log(state.search.result);
        clearLoader();
        searchView.renderResults(state.search.result);
    }
    
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});















