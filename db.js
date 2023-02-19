const mongoose = require('mongoose');
const connection = process.env.DBURL;
const collection = process.env.COLL;

const db = async () => {
    try {
        
        mongoose.set('strictQuery', true);
        await mongoose.connect(`${connection}/${collection}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`DB Connected to: ${connection}/${collection}`);

    } catch (err) {
        console.error(`DB Error: ${err.message}`);
    }
}

module.exports = { db, mongoose }