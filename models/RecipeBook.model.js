const mongoose = require('mongoose');

const RecipeBook = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    recipes: [
        {type: mongoose.Types.ObjectId, ref: "Recipe"}
    ],
    icon: String,
    created: Date,
    OwnerID: {
        type: mongoose.Types.ObjectId, 
        ref: "User"
    },
},{
    virtuals: {
        recipeCount: {
            get() {
                return `${this.recipes.length}`
            }
        }
    }
});

module.exports = mongoose.model('RecipeBook', RecipeBook)