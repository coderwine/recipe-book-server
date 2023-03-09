const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    ingredients: [Object],
    servings: Number,
    nutrients:[Object],
    OwnerID: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    recipeBook: {
        type: mongoose.Types.ObjectId,
        ref: "RecipeBook"
    },
    dateAdded: Date
});

//NOTE: Need any virtuals?...

module.exports = mongoose.model('Recipe', Recipe)