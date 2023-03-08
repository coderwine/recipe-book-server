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

---

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
user | post | / | true | Completed |
| | get | /single-book/:id | true | Completed |
| | get | / | false | Completed |
| | get | /my-books | true | Completed |
| | patch | /update-book/:id | true | Completed |
| | delete | /remove-book/:id | true | Completed | 

**Note:**
NA

---

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
user | POST | /add-recipe/:book_id | true | Completed |
| | GET | /get-all | false | Completed |
| | GET | /single-recipe/:id | true | Completed |
| | GET | /get-all/user/ | true | Completed |
| | GET | /get-all/book/:id | true | Completed |
| | DELETE | /remove/:id | true | Completed |
| | PATCH | /update/:id | true | Completed |

---

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

# NOTES:
- Why might I need something like `populate()` or `join()`?
- https://mongoosejs.com/docs/populate.html
- https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60