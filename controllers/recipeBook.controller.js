const router = require('express').Router();
const { success, issue, error} = require('../helpers');
const { RecipeBook, User } = require('../models');
const { validate } = require('../middleware');

// Create
router.post('/', validate, async (req, res) => {
    try {
        
        const { title, description, icon } = req.body;

        const findBook = await RecipeBook.find({
            title: title, OwnerID: req.user._id
        });

        if(findBook.length > 0) throw new Error('Please provide your book with a unique title')

        const book = new RecipeBook({
            title, 
            description: description ? description : "Need to fill out",
            icon: icon ? icon : "not available",
            created: new Date(),
            OwnerID: req.user._id
        });

        const newBook = await book.save();

        await User.findByIdAndUpdate({_id: book.OwnerID}, {$push: {books: newBook} });

        newBook ? 
            success(res, newBook) :
            issue(res);

    } catch (err) {
        error(res,err);
    }
});

// Get One
router.get('/single-book/:id', validate, async (req, res) => {
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

    try {
        
        const allBooks = await RecipeBook.find({OwnerID: req.user._id});

        allBooks ?
            success(res, allBooks) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
})

// Update
router.patch('/update-book/:id', validate, async (req, res) => {
    try {
        
        const info = req.body;
        const userID = req.user._id;
        const { id } = req.params;
        const filter = {_id: id, OwnerID: userID};
        const returnOptions = {new: true}

        // Checks if title already exists within users collection
        if(info.title) {
            const titleCheck = await RecipeBook.findOne({title: info.title, OwnerID: userID});
    
            if(titleCheck) throw new Error(`${info.title} book already exist, please use a different name`);
        } 

        const update = await RecipeBook.findOneAndUpdate(filter, info, returnOptions);



        update ?
            success(res, update) : issue(res);

    } catch (err) {
        error(res, err);
    }
});

// Delete
router.delete('/remove-book/:id', validate, async (req, res) => {
    try {
        
        const userID = req.user._id;
        const { id } = req.params;
        const payload = {_id: id, OwnerID: userID}

        const validateBookOwner = await RecipeBook.findOne(payload);

        let removed;

        validateBookOwner ?
            removed = await RecipeBook.findByIdAndDelete({_id: id}) :
            new Error("User is not authorized to remove this book.");

        await User.findByIdAndUpdate({_id: userID},{$pull: {books: id}});
        
        removed ?
            success(res, {message: `${removed.title} removed`}) : issue(res)

    } catch (err) {
        error(res, err);
    }
});

module.exports = router;