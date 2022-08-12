
const User = require('../models/User');
const { isLoggedIn } = require('./helpers');

view_router = require('express').Router();
//pull in express
// check if user is logged in ... that can be done in a later step
// const { isLoggedIn } = require('./helpers');


// after the view routes I will add the user model page



// Homepage 
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

// Login page 
view_router.get('/login', isLoggedIn, (req, res) => {
    //errors are being attached to the session object, so it can be sent throught wehn the page loads
    res.render('login', {errors: req.session.errors});
});

// register page 
view_router.get('/register', isLoggedIn, (req, res) => {
    res.render('register', {errors: req.session.errors});
});

//dashboard page
view_router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard', {errors: req.session.errors});
});

module.exports = view_router;