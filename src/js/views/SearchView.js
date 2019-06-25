import {elements} from  "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
}

const renderRecipe = recipe => { 

   
    const recipeInside = recipe.recipe;
    // console.log(recipeInside);

    const markup = `
        <li>
            <a class="results__link" href=${recipeInside.calories}>
                <figure class="results__fig">
                    <img src=${recipeInside.image} alt=${recipeInside.label}>
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipeInside.label}</h4>
                    <p class="results__author">${recipeInside.source}</p>
                </div>
            </a>
        </li>
    `;
    // console.log(recipe);
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
}


export const renderResults = recipe => {
    recipe.forEach(renderRecipe);
    // console.log(recipe);
};