export const selectedElements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchSpinnerParent: document.querySelector('.results'),
    searchResList : document.querySelector('.result__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list')
}

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"> </use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    console.log(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}

export const hideLoader = ()=>{
    const loader = document.querySelector(`.${elementStrings.loader}`);
    
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}