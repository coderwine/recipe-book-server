require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

//! Imports
const {db} = require('./db');
const {
    usercontroller, recipeBookcontroller, recipecontroller, ingredientscontroller, groceryListcontroller
} = require('./controllers');

//! Middleware
app.use(express.json());
app.use(cors());

//! Routes
app.use('/user', usercontroller);
app.use('/books', recipeBookcontroller);
app.use('/recipe', recipecontroller);
app.use('/ingredients', ingredientscontroller);
app.use('/lists', groceryListcontroller);

//! Connection
const server = async () => {
    db();

    app.listen(PORT, () => {
        console.log(
            `Server is Running on port: ${PORT}`
        )
    })
}

server();