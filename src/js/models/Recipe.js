import axios from 'axios';
import { cors, appId, appKey, key } from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const response = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = response.data.recipe.title;
            this.author = response.data.recipe.publisher;
            this.img = response.data.recipe.image_url;
            this.url = response.data.recipe.source_url;
            this.ingridients = response.data.recipe.ingridients;
            // console.log(this.response);
            // const response1 =   await axios(`${cors}https://api.edamam.com/search?q=${this.index}&app_id=${appId}&app_key=${appKey}&to=30`);
            // console.log(response1);
            // this.result = response1.data.hits;

        } catch(error){
            console.log(error);
            alert("Something went wrong :(")
        }
    }

    calcTime(){
        // Assuming that we need 15 minutes for each 3 ingridients
        const numIng = this.ingridients.length;
        const periods = Math.ceil(numIng / 3);
        this.title = periods * 15;
    }

    calcServing(){
        this.serving = 4;
    }
}