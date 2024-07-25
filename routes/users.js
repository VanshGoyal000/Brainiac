const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); // Ensure this path is correct
const passport = require('passport');
const { check, validationResult } = require('express-validator');

// Render signup form
router.get('/signup', (req, res) => {
    res.render('signup', { errors: [] });
});

// Handle signup form submission
router.post('/signup', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('password2', 'Passwords do not match').custom((value, { req }) => value === req.body.password)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup', { errors: errors.array() });
    }
    
    // Registration logic here
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        await User.register(user, password);
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
    } catch (err) {
        res.render('signup', { errors: [{ msg: err.message }] });
    }
});

router.get('/login', (req, res) => {
  res.render('login', { errors: req.flash('error') });
});

// Handle login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/quizzes/brainco',
  failureRedirect: '/users/login',
  failureFlash: true
}));

module.exports = router;
