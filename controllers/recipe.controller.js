const router = require('express').Router();
const { Recipe, RecipeBook, User } = require('../models');
const { success, error, issue } = require('../helpers');
const { validate } = require('../middleware');

// Create
router.post('/add-recipe/:book_id', validate, async (req, res) => {
    try {
        
        const { title, description, image, servings } = req.body;
        const { book_id } = req.params;
        const { id } = req.user;

        const recipe = new Recipe({
            title,
            description: description ? description : "A feast perhaps?...",
            image: image ? image : "no image",
            servings: servings ? servings : 1,
            OwnerID: id,
            recipeBook: book_id,
            dateAdded: new Date()
        })

        const addRecipe = await recipe.save();

        await RecipeBook.findOneAndUpdate({_id: book_id}, {$push: {recipes: addRecipe}});
        await User.findOneAndUpdate({_id: id}, {recipes: addRecipe}); 

        // let viewBook = await RecipeBook.findOne({_id: book_id}).populate('recipes').exec((err, book) => {
        //     if(err) return handleError(err);
        //     console.log(book.recipes);
        //     console.log(book.populated("recipes"))
        // })

        addRecipe ? 
            success(res, addRecipe) : issue(res);

    } catch (err) {
        error(res, err);
    }
})

// Get All - no validation
router.get('/get-all', async (req, res) => {
    try {
        
        const allRecipes = await Recipe.find();

        allRecipes ? 
            success(res, allRecipes) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
});

// Get One
router.get('/single-recipe/:id', validate, async (req, res) => {
    try {
        
        const recipe_id = req.params.id;
        const user_id = req.user.id;

        const filter = {
            _id: recipe_id,
            OwnerID: user_id
        }

        const recipe = await Recipe.find(filter)

        recipe ?
            success(res, recipe) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
})

// Get All by User
router.get('/get-all/user/', validate, async (req, res) => {

    try {
        
        const allRecipes = await Recipe.find({OwnerID: req.user._id});

        allRecipes ?
            success(res, allRecipes) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
})

// Get All by Book
router.get('/get-all/book/:id', validate, async (req, res) => {
    try {
        
        const {id} = req.params;
        const userID = req.user.id;

        const filter = {recipeBook: id, OwnerID: userID};

        const allRecipesInBook = await Recipe.find(filter);

        allRecipesInBook ?
            success(res, allRecipesInBook) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
})

// Delete
router.delete('/remove/:id', validate, async (req, res) => {
    try {
        
        const { id } = req.params;
        const userID = req.user.id;
        const payload = { _id: id, OwnerID: userID }

        const validateRecipeOwner = await Recipe.findOne(payload);

        const book = validateRecipeOwner.recipeBook;

        let removed;

        validateRecipeOwner ?
            removed = await Recipe.findByIdAndDelete({_id: id}) :
            new Error("User is not authorized to remove this recipe");
        
        if(removed) {

            await User.findByIdAndUpdate(
                    {_id: userID},
                    {$pull: {recipes: id}}
                )

            await RecipeBook.findByIdAndUpdate(
                    {_id: book},
                    {$pull: {recipes: id}}
                )
            
            success(res, {message: `${removed.title} removed`})
        } else {
            issue(res);
        }

    } catch (err) {
        error(res, err);
    }
})

// Update
router.patch('/update/:id', validate, async (req, res) => {
    try {
        
        const info = req.body;
        const userID = req.user.id;
        const { id } = req.params;
        const filter = {
            _id: id,
            OwnerID: userID
        };

        const returnOptions = {new: true};

        const update = await Recipe.findOneAndUpdate(
            filter, info, returnOptions
        );

        update ?
            success(res, update) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
})

module.exports = router;