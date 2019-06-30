import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/SearchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/*
Gloabal State of the App
    - Search object
    - Current recipe object
    - Shopping lisg object
    - Liked recipes
*/

const state = {};

// **** Search Controller ****

const controlSearch = async () => {
  //1. get query from view
  const query = searchView.getInput();

  if (query) {
    //2. new search object and add to state
    state.search = new Search(query);

    //3. prepare UI for result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //4. search for recipes
      await state.search.getResults();

      //5. render results on UI
      // console.log(state.search.result);
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Something went wrong with the search");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    // console.log(goToPage);
  }
  // console.log(e.target);
});

// ********************
// Recipe Controller
// ********************

// const r = new Recipe(46956);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () => {
  // get id from the url
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // Prepare UI fro changes

    //Create new recipe Object
    state.recipe = new Recipe(id);

    try {
      //Get Recipe data and parsr ingridients
      await state.recipe.getRecipe();
      console.log(state.recipe.ingridients);
      state.recipe.parseIngredients();

      // Calculate serving and time
      state.recipe.calcTime();
      state.recipe.caclServing();

      // Render a recipe
      console.log(state.recipe);
    } catch (err) {
      alert("Error processing recipe!!");
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
