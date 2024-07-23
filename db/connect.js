const mongoose = require('mongoose');

async function connectDb() {
    try {
        const instance = await mongoose.connect('mongodb://127.0.0.1:27017/quiz-website');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = connectDb;
