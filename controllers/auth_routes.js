const auth_router = require('express').Router();
const User = require("../models/User");
const { isLoggedIn } = require('./helpers');
// finish helpers file // is logged

// lets test the login

auth_router.post('/login', isLoggedIn, (req,res) => {
    console.log("loggin in")
    // const { email, password} = req.body;

    if(!req.body.email || !req.body.password) {
        //attach erros to the session object
        req.session.errors = ['invalid username or password.'];
        return res.redirect('/login')
    }
    User.findOne({
        where: {email: req.body.email}
        //needs to be async becasue it needs to wait until it is found
    }).then(async user => {
        // check if there is a user
        if(!user) {
            req.session.error = ['there is no user with that email'];
            return res.redirect('/login');
        }
        // check if the password matches the user password
        if ( password != user.password){
            req.session.errors = ['your password is incorrect'];
            return res.redirect('/login');
        }

        const pass_is_valid = await user.validatePassword(req.body.password, user.password);

        if (!pass_is_valid){
            req.session.errors = ['password incorrect'];
            res.redirect('/login');
            return;
        } else {
            req.session.save(() => {
                req.session.userId = user.id
            })
        }
        // once the user is validated and no errors have occured, we start a new 
        // session and attach the user id to the session object 
        req.session.save(() => {
            req.session.user_id = user.id;
            // after storing the user id to the session object, we redirect them back 
            // to the root route/index view
            res.redirect('/');
        })
    })
})


module.exports = auth_router;