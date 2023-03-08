const mongoose = require('mongoose');

const Ingredient = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: String,
    amount: {
        measurement: {
            type: String,
            enum: ["metric","us","imperial"]
        },
        unit: String,
        value: Number,
    },
    substitution: [Object],
    estCost: Number
});

module.exports = mongoose.model('Ingredient', Ingredient)