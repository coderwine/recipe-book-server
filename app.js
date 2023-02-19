require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

//! Imports
const {db} = require('./db');
// controllers

//! Middleware
app.use(express.json());
app.use(cors());

//! Routes

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