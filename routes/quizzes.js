const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz.model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const crypto = require('crypto');
const userModel = require('../models/user.model');


//brainco
router.get('/brainco' , isLoggedIn , (req , res)=>{
    res.render('brainco');
})

// Create a quiz
router.get('/create',isLoggedIn ,  (req, res) => {
    res.render('createQuiz');
});

// router.post('/create', async (req, res) => {
//     const { title, questions } = req.body;
//     const quiz = new Quiz({
//         title,
//         creator: req.user._id,
//         questions,
//         code: Math.random().toString(36).substring(2, 10) // Generate a random code
//     });
//     await quiz.save();
//     res.redirect(`/quizzes/${quiz._id}`);
// });

router.post('/create', isLoggedIn, async (req, res) => {
    try {
        const { title, questions, timeLimit } = req.body;
        console.log('Received form data:', req.body); // Debug statement

        const code = crypto.randomBytes(3).toString('hex');
        const quiz = new Quiz({
            title,
            questions: questions.map(q => ({
                text: q.text,
                options: q.options,
                correctAnswer: q.correctAnswer
            })),
            code,
            creator: req.user._id,
            timeLimit
        });

        await quiz.save();
        console.log('Quiz created successfully:', quiz); // Debug statement
        res.redirect(`/quizzes/sharehere?code=${code}&id=${quiz._id}`);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.render('createQuiz', { error: 'An error occurred while creating the quiz.' });
    }
});


// after creating quiz
router.get('/sharehere', async (req, res) => {
    const {code , id} = req.query;
    console.log('share' , code)
    res.render('afterCreatingQuiz' , {code , id})
})

// Join a quiz
router.get('/join', isLoggedIn , (req, res) => {
    res.render('join_quiz');
});

router.post('/join', async (req, res) => {
    const { code } = req.body;
    try {
        const quiz = await Quiz.findOne({ code });
        if (quiz) {
            res.redirect(`/quizzes/${quiz._id}`);
        } else {
            // Pass error message to the view
            res.render('join_quiz', { error: 'Invalid code' });
        }
    } catch (error) {
        res.render('join_quiz', { error: 'An error occurred' });
    }
});

// Access a quiz
router.get('/:id',isLoggedIn ,async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz){
            return res.redirect('/quizzes/join' , {error : 'no quiz present on this id'})
        }
        res.render('quiz', { quiz });
    } catch (error) {
        res.redirect('/quizzes/join')
    }
});

// Submit a quiz
router.post('/:id/submit', async (req, res) => {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    let score = 0;

    // Calculate score
    quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
            score++;
        }
    });

    // Save score
    quiz.scores.push({ user: req.user._id, score });
    await quiz.save();

    res.redirect(`/quizzes/${quiz._id}/leaderboard`);
});

// Leaderboard
router.get('/:id/leaderboard', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id).populate('scores.user');
    res.render('leaderboard', { quiz });
});

module.exports = router;
