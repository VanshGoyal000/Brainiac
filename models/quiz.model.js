const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true }
});

const scoreSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: { type: [questionSchema], required: true },
    code:{type:String , required :true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timeLimit : Number,
    scores: { type: [scoreSchema], default: [] }
});

module.exports = mongoose.model('Quiz', quizSchema);
