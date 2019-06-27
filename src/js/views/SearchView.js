import {elements} from  "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = "";
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc,cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
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
                    <h4 class="results__name">${limitRecipeTitle(recipeInside.label)}</h4>
                    <p class="results__author">${recipeInside.source}</p>
                </div>
            </a>
        </li>
    `;
    // console.log(recipe);
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
}

const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1 } >
        <span>Page ${type === "prev" ? page - 1 : page + 1 }</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right" } " ></use>
        </svg>
        </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    // console.log(resPerPage);
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if(page === 1 && pages > 1){
        button = createButton( page, "next");
    }else if (page < pages){
        button = `
            ${createButton( page , "prev" )}
            ${createButton( page,  "next" )}
        `;
    }else if (page === pages && pages > 1){
        button = createButton( page, "prev");
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};


export const renderResults = (recipe, page = 1, resPerPage = 10) => {
    // render result of currunt page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipe.slice(start,end).forEach(renderRecipe);
    // console.log(recipe);

    // render pagination
    renderButtons(page,recipe.length, resPerPage);
};