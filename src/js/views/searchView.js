import { selectedElements } from './base';

export const getInput = () => selectedElements.searchInput.value;

export const clearInput = () => selectedElements.searchInput.value = '';

export const clearResults = () => {
    selectedElements.searchResultList.innerHTML = ``;
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
const createdButton = (page, type) => `
        <button class="btn-inline results__btn--${type} data-goto=${type === 'prev' ? page = -1 : page + 1}">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page = -1 : page + 1} </span>
        </button>
`

const renderButton = (page) => {
    const pages = Math.ceil(numResults / restPerpage);
    let button;

    if (page === 1 && pages > 1) {
        button = createdButton(page, 'next');
    } else if (page < pages) {
        // both buttons
        button = `
            ${createdButton(page, 'prev')}
            ${createdButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1 ) {
        button = createdButton(page, 'prev');
    }

}

export const renderResults = (recipes, page = 1, restPerpage = 10) => {
    const start = (page - 1) * restPerpage;
    const end = page * restPerpage;

    recipes.slice(start, end).forEach(renderRecipe);
}