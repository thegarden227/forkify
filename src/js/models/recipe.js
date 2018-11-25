import axios from 'axios';
import {apiKey} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        const key = apiKey;
        try {
            const res = await axios(`http://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            // this.result = res.data.recipes;
            
            const obtainedRecipe = res.data.recipe;
            console.log(obtainedRecipe);
            this.title = obtainedRecipe.title;
            this.author = obtainedRecipe.publisher;
            this.img = obtainedRecipe.image_url;
            this.url = obtainedRecipe.source_url;
            this.ingredients = obtainedRecipe.ingredients;
            
        } catch (error){
            console.log(error)
            alert(`Something went wrong:()`);
        }
    }

    cookingTime() {
        const numIngredient = this.ingredients.length;
        const periods = Math.ceil(numIngredient / 3);
        this.time = periods * 15;

    }

    numOfServing() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, unitsShort[index]);
            })

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> 4.5
                // Ex. 4 cups, arrCount is [4]

                const arrCount = arrIng.slice(0, unitIndex); 
                let count;

                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                    
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                    
                }
                
                objIng = {
                    count, 
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)){
                // There is No Unit, but there is number at 1st element
                objIng = { 
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')

                }
            }
            else if (unitIndex === -1) {
                // There is No Unit and no number at 1st element
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }

}