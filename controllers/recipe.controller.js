const router = require('express').Router();
const { Recipe, RecipeBook, User } = require('../models');
const { success, error, issue } = require('../helpers');
const { validate } = require('../middleware');

// Create
router.post('/add-recipe/:book_id', validate, async (req, res) => {
    try {
        
        const { title, description, image, servings } = req.body;
        const { book_id } = req.params

        const recipe = new Recipe({
            title,
            description: description ? description : "A feast perhaps?...",
            image: image ? image : "no image",
            servings: servings ? servings : 1,
            OwnerID: req.user._id,
            recipeBook: book_id,
            dateAdded: new Date()
        })

        const addRecipe = await recipe.save();
        // TODO: Populate Recipe Book & User Lists
        // LINK - https://mongoosejs.com/docs/populate.html
        //LINK - https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60
        await RecipeBook.findOne({_id: book_id}).populate('recipes').exec((err, book) => {
            if(err) return handleError(err);
            console.log(book.recipes);
            console.log(book.populated("recipes"))
        })

        addRecipe ? 
            success(res, addRecipe) : issue(res);

    } catch (err) {
        error(res, err);
    }
})

// Get One

// Get All by User

// Get All by Book

// Get All - no validation

// Delete

// Update

module.exports = router;