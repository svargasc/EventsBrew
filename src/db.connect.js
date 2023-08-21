const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017') 
        console.log('Db is connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;