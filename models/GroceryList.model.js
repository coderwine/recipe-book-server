const mongoose = require('mongoose');

const GroceryList = new mongoose.Schema({
    title: String,
    items: [Object],
    OwnerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('GroceryList', GroceryList)