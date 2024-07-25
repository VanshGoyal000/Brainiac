const mongoose = require('mongoose');
require('dotenv').config();

async function connectDb() {
    try {
        const instance = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = connectDb;
