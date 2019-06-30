import axios from "axios";
import { cors, appId, appKey, key } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const response = await axios(
        `https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`
      );
      this.title = response.data.recipe.title;
      this.author = response.data.recipe.publisher;
      this.img = response.data.recipe.image_url;
      this.url = response.data.recipe.source_url;
      this.ingridients = response.data.recipe.ingredients;
      //   console.log(response);
      // const response1 =   await axios(`${cors}https://api.edamam.com/search?q=${this.index}&app_id=${appId}&app_key=${appKey}&to=30`);
      // console.log(response1);
      // this.result = response1.data.hits;
    } catch (error) {
      console.log(error);
      alert("Something went wrong :(");
    }
  }

  calcTime() {
    // Assuming that we need 15 minutes for each 3 ingridients
    const numIng = this.ingridients.length;
    const periods = Math.ceil(numIng / 3);
    this.title = periods * 15;
  }

  calcServing() {
    this.serving = 4;
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "onuce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];
    const newIngridients = this.ingridients.map(el => {
      // Uniform units
      let ingridient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingridient = ingridient.replace(unit, unitsShort[i]);
      });

      // Remove paranthesis
      ingridient = ingridient.replace(/ *\([^)]*\) */g, " ");

      // Parse Ingridients into count, unit and ingridients
      const arrIng = ingridient.split(" ");
      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
      let objIng;
      if (unitIndex > -1) {
        // there is a unit
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingridient: arrIng.slice(unitIndex + 1).join(" ")
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit but 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingridient: arrIng.slice(1).join(" ")
        };
      } else if (unitIndex === -1) {
        // There is NO unit and NO element n 1st position
        objIng = {
          count: 1,
          unit: "",
          //   ingridient: ingridient
          ingridient
        };
      }

      return objIng;
    });
    this.ingridients = newIngridients;
  }
}
