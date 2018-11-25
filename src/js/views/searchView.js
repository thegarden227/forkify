import { selectedElements } from './base';

export const getInput = () => selectedElements.searchInput.value;


export const clearInput = () => selectedElements.searchInput.value = '';

export const clearResults = () => {
    selectedElements.searchResultList.innerHTML = ``;
    selectedElements.searchResPages.innerHTML=``;
}

const shorternTitle = (title, lengthLimit = 17) => {
    const newTitle = [];
    if (title.length > lengthLimit){

        title.split(' ').reduce((acc, item)=> {
    
            if (acc + item.length <= lengthLimit) {
                newTitle.push(item);
            }
            return acc + item.length;
    
        }, 0);

    } else {
        return title;
    }
    return `${newTitle.join(' ')}`;

}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="likes__link" href="#${recipe.recipe_id}">
                <figure class="likes__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${shorternTitle(recipe.title)} ...</h4>
                    <p class="likes__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>

    `;
    selectedElements.searchResultList.insertAdjacentHTML('beforeend', markup);

}

//Type : 'prev' or 'next'
const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto-page="${type === 'prev' ? page - 1 : page + 1}">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page - 1 : page + 1} </span>
        </button>
`

const renderButton = (page, numResults, restPerPage) => {
    const pages = Math.ceil(numResults / restPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    selectedElements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, restPerpage = 10) => {
    //render results of current page
    const start = (page - 1) * restPerpage;
    const end = page * restPerpage;
    recipes.slice(start, end).forEach(renderRecipe);
    //render pagination 
    renderButton(page, recipes.length, restPerpage);
}