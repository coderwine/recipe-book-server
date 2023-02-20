const mongoose = require('mongoose');

const Ingredient = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    measurementType: String,
    measurement: Number,
    substitution: [Object],
    estCost: Number
});

module.exports = mongoose.model('Ingredient', Ingredient)