import axios from 'axios';
import {apiKey} from '../config';

export default class Search{
    
    constructor(query){
        this.query = query;
    }

    async getResults() {
        // const key = `674a4960b64ea75e0da16dde7306d09a`;
        const key = apiKey;
        try {
            const res = await axios(`http://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            
            // console.log(res, res.data, res.data.recipes, recipes);
        } catch (error) {
            alert(`ERROR: ${error}`);
        }
    }

// getResults(`pizza`);


}