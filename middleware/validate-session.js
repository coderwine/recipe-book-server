const { User } = require('../models')
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;
const { error } = require('../helpers');

const validateSession = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, JWT);
        if(!decodedToken) throw new Error('Not Authorized');

        const user = await User.findById(decodedToken.id);
        if(!user) throw new Error("User not found");

        req.user = user;

        next();

    } catch (err) {
        error(res, err);
    }
}

module.exports = validateSession;