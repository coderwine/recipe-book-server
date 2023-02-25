const router = require('express').Router();
const { success, issue, error} = require('../helpers');
const { RecipeBook } = require('../models');
const { validate } = require('../middleware');

// Create
router.post('/', validate, async (req, res) => {
    try {
        
        const { title, description, icon } = req.body;

        //TODO: Associate unique titles per user, not by the collection list
        const findBook = await RecipeBook.find({
            title: title, OwnerID: req.user._id
        });
        // console.log('Find Book: ', findBook)

        if(findBook.length > 0) throw new Error('Please provide your book with a unique title')

        const book = new RecipeBook({
            title, 
            description: description ? description : "Need to fill out",
            icon: icon ? icon : "not available",
            OwnerID: req.user._id
        });

        const newBook = await book.save();

        newBook ? 
            success(res, newBook) :
            issue(res);

    } catch (err) {
        error(res,err);
    }
});

// Get One
router.get('/:id', validate, async (req, res) => {
    try {
        
        const id = req.params.id;
        const payload = {
            _id: id,
            OwnerID: req.user._id
        }

        const book = await RecipeBook.find(payload);
        console.log(book);
        book ?
            success(res,book) :
            issue(res)

    } catch (err) {
        error(res, err);
    }
});

// Get All
router.get('/', async (req, res) => {
    try{
        const findAllBooks = await RecipeBook.find();

        findAllBooks ?
            success(res, findAllBooks) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
});

// Get All by User
router.get("/my-books", validate, async (req, res) => {
    console.log(req.user)

    /* 
    TODO
    Fix this error:
    * "Error": "Cast to ObjectId failed for value \"my-books\" (type string) at path \"_id\" for model \"RecipeBook\""
    */
    
    // try {
        
    //     const allBooks = await RecipeBook.find({OwnerID: req.user._id});

    //     console.log(allBooks)

    //     allBooks ?
    //         success(res, allBooks) :
    //         issue(res);

    // } catch (err) {
    //     error(res, err);
    // }
})

// Update

// Delete

module.exports = router;