const router = require('express').Router();
const { Recipe, Ingredient } = require('../models');
const { validate } = require('../middleware');
const { success, issue, error } = require('../helpers');

// Create
router.post('/add', validate, async (req,res) => {
    try {

        const { title, image, amount, substitutions, estCost } = req.body;

        const ingredient = new Ingredient({
            title, 
            image: image ? image : 'placeholder text',
            amount: {
                measurement: amount.measurement,
                unit: amount.unit,
                value: amount.value
            },
            substitutions,
            estCost: estCost ? estCost : 0.00,
        });

        const newIngredient = await ingredient.save();

        newIngredient ?
            success(res, newIngredient) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
});

// Add as subsitute

// Get One

// Get All

// Delete

// Update




module.exports = router;