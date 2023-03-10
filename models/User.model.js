const mongoose = require('mongoose');
const role = require('mongoose-role');

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.Types.ObjectId, 
        ref: 'RecipeBook'
    }],
    recipes:[{
        type: mongoose.Types.ObjectId, 
        ref: 'Recipes'
    }],
    avatar: String,
    phone: Number,
    age: Date,
    creationDate: Date
},{
    virtuals: {
        fullName: {
            get() {
                return `${this.firstName} ${this.lastName}`
            }
        },
        bookCount: {
            get() {
                return `${this.books.length}`
            }
        },
        currentAge: {
            get() {
                const date = new Date().toDateString();
                const userAge = date - this.age;

                return(userAge);
            }
        },
        //TODO: Add a get() for num. recipes per book.
    }
});

User.plugin(role, {
    roles: [
        'user', 'admin', 'public'
    ],
    accessLevels: {
        anon: ['public'],
        public: ['public','user','admin'],
        user: ['user','admin'],
        admin: ['admin']
    }
})

module.exports = mongoose.model('User', User)