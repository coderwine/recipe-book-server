const usercontroller = require('./user.controller');
const recipecontroller = require('./recipe.controller');
const recipeBookcontroller = require('./recipeBook.controller');
const ingredientscontroller = require('./ingredients.contoller');
const groceryListcontroller = require('./groceryList.controller');

module.exports = {
    usercontroller, recipeBookcontroller, recipecontroller, ingredientscontroller, groceryListcontroller
}