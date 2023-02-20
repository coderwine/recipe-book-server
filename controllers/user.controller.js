const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;
const expires = {expiresIn: 60*60*24};
const { error, success, issue } = require('../helpers');
const { validate } = require('../middleware');

//* Signup
router.post('/signup', async (req, res) => {
    try {

        const { firstName, lastName, email, password, passwordCheck, role } = req.body;

        if(password !== passwordCheck) throw new Error('Passwords do not match');

        const user = new User({
            firstName, lastName, email,
            password: bcrypt.hashSync(password, 13),
            creationDate: new Date(),
            role: role === "admin" ? role : "user"
        })

        const newUser = await user.save();

        let token;

        newUser ? 
            token = jwt.sign({id: newUser._id}, JWT, expires) :
            issue(res);

        const result = {
            name: newUser.fullName,
            password: newUser.password,
            email: newUser.email
        }

        success(res, result, token);
        
    } catch (err) {
        error(res, err);
    }
})

//* Login
router.post('/login', async (req, res) => {
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({email: email});
        const valPassword = bcrypt.compare(password, user.password);

        if(!valPassword || !user) throw new Error('Email or Password are incorrect');

        const token = jwt.sign({id: user.id}, JWT, expires);

        const display = {
            name: user.fullName,
            email: user.email,
        }

        user ? 
            success(res, display, token) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
});

//* Forget Password

//* Update
router.patch('/profile', validate, async (req, res) => {
    try {
        
        const {
            firstName, lastName, email, password, newPassword, avatar, phone, age
        } = req.body;

        const user = req.user

        const valPassword = bcrypt.compare(password, user.password);

        if(!valPassword) throw new Error('Password does not match our records');

        let setPassword;

        newPassword ?
            setPassword = bcrypt.hashSync(newPassword, 13) :
            setPassword = bcrypt.hashSync(password, 13);

        const updated = {
            firstName, lastName, email,
            password: setPassword,
            avatar, phone, age
        }

        const returnOpt = {new: true};

        const updateUser = await User.findOneAndUpdate({_id: user.id}, updated, returnOpt);

        const results = {
            id: updateUser._id,
            name: updateUser.fullName,
            email: updateUser.email,
            avatar: updateUser.avatar,
            phone: updateUser.phone,
            age: updateUser.age
        }

        updateUser ? 
            success(res, results) :
            issue(res);

    } catch (err) {
        error(res, err);
    }
});

//* Delete

//! Admin

//* Get All Users

//* Get One User by ID

module.exports = router;