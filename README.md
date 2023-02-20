# Concept

This application is meant to capture users personal recipe book to help them not only keep track of their own recipes but to quickly build out a grocery list based off of what is needed.

The main purpose is to be able to save as much money on a grocery list based off a users favorite meals.

# Main Dependencies
- mongoose
- mongoose-role
  - [npm](https://www.npmjs.com/package/mongoose-role)

# Models 
## Users 
- firstName: String
- lastName: String
  - fullName: Virtural()
- avatar: Blob
- email: String
- phone: String
- password: String
- books: [OBJECT]
  - collection of books

## RecipeBook
- title: String
- description: String
- recipes: [OBJECT]
  - *Recipe*
    - ID, Title, Servings

## Recipe
- title: String
- description: String
- image: Blob
- ingredients: [OBJECT]
  - item: String
  - amount: Number
  - sub: String
- servings: Number

## ingredients
- title: String
- measurementType: String
- measurement: Number
- substitution: [Objects]
  - *ingredient*
    - id, title
- estCost: Number
  - may be brought in later.

## GroceryList
- title: String
- item: [Object]
  - *ingredients*
    - ID, title, estCost