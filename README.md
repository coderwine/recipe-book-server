# Concept

This application is meant to capture users personal recipe book to help them not only keep track of their own recipes but to quickly build out a grocery list based off of what is needed.

The main purpose is to be able to save as much money on a grocery list based off a users favorite meals.

# Main Dependencies
- mongoose
- mongoose-role
  - [npm](https://www.npmjs.com/package/mongoose-role)
- [cloudinary](https://cloudinary.com/developers)

# Models 
## Users 
- firstName: String
- lastName: String
  - fullName: Virtural()
- avatar: String
- email: String
- phone: String
- password: String
- books: [OBJECT]
  - collection of books

### Controller
role | method | endpoint | validation | status |
--- | --- | --- | --- | --- |
user | post | /signup | false | complete |
| | post | /login | false | complete |
 || get | /:id | true | complete |
 || patch | /forgot-password | true | WIP |
 || patch | /profile | true | complete |
 || delete | /:id | true | complete |
 admin | get | /admin/:id | true | complete
 || get | /admin/all-users/:role | true | complete

## RecipeBook
- title: String
- description: String
- recipes: [OBJECT]
  - *Recipe*
    - ID, Title, Servings
- icon: String

### Controller
role | method | endpoint | validation | status |
--- | --- | --- | --- | --- |

## Recipe
- title: String
- description: String
- image: String
- ingredients: [OBJECT]
  - item: String
  - amount: Number
  - sub: String
- servings: Number

### Controller
role | method | endpoint | validation | status |
--- | --- | --- | --- | --- |

## Ingredients
- title: String
- measurementType: String
- measurement: Number
- substitution: [Objects]
  - *ingredient*
    - id, title
- estCost: Number
  - may be brought in later.

### Controller
role | method | endpoint | validation | status |
--- | --- | --- | --- | --- |

## GroceryList
- title: String
- item: [Object]
  - *ingredients*
    - ID, title, estCost

### Controller
role | method | endpoint | validation | status |
--- | --- | --- | --- | --- |