import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults() {
        const key = 'fe708b01fc01fd9a0d26b430d3610e1f';
        const cors = "https://cors-anywhere.herokuapp.com/";
        const appKey = "3a6436002c282fc8588b642a80b2a7d9";
        const appId = "be59fb15";
        // const key = process.env.FOOD2FORK_API_KEY;
        // const cors = "https://cors-anywhere.herokuapp.com/";
        // const appKey = process.env.EDAMAM_API_KEY;
        // const appId = process.env.EDAMAM_API_ID;
       

        try{
            // const response1 = await axios(`${cors}https://api.edamam.com/search?q=${this.query}&app_id=${appKey}&app_key=${appId}`);
            // console.log(response1);
            // const response = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            // this.result = response.data.recipes;
            // console.log(this.result);
            const response1 =   await axios(`${cors}https://api.edamam.com/search?q=${this.query}&app_id=${appId}&app_key=${appKey}&to=30`);
            this.result = response1.data.hits;
            // console.log(this.result);

        }catch(error){
            alert(error);
        }
    }
}



// URL
// https://www.food2fork.com/api/search


// Food2Fork API
// 
