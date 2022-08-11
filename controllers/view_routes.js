const { response } = require('express');
const User = require('../models/User');
const { isLoggedIn } = require('./helpers');

view_router = require('express').Router();
//pull in express
// check if user is logged in ... that can be done in a later step
// const { isLoggedIn } = require('./helpers');


// after the view routes I will add the user model page

// const User = require('../models/User')
view_router.get('/', isLoggedIn, (req, res) => {
    // now that the user is getting authenticated, i need to check if the user is logged in when render the page.
    // if the user is logged in then the page is rendered different.
    const user_id = req.session.userId

    if(user_id) {
        return User.findOne({
            where: {
                id: user_id,
            },
            // include blog posts.
            // in the future, i will want to display blog post not here but in '/dashboard' and it will look something like 
            // the following code..
            attributes: ["id", "email", "username"], 
        }).then((user) => {
            user = {
                username: user.username, 
                email: user.email,
                // this is where you can attach a blog post to a user 
            }
            res.render("index", { user });
        })
    };

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