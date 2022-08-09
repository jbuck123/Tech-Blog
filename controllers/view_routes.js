view_router = require('express').Router();
//pull in express
// check if user is logged in ... that can be done in a later step
// const { isLoggedIn } = require('./helpers');


// after the view routes I will add the user model page

// const User = require('../models/User')





view_router.get('/', (req, res) => {
    res.render('index');
});
view_router.get('/login', (req, res) => {
    res.render('login');
});
view_router.get('/register', (req, res) => {
    res.render('register');
});
view_router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = view_router;