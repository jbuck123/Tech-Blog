const auth_router = require('express').Router();
const User = require("../models/User");
// finish helpers file // is logged

// lets test the login

auth_router.post('/login', (req,res) => {
    const { email, password} = req.body;

    if(!email || !password) {
        //attach erros to the session object
        req.session.errors = ['invalid username or password.'];
        return res.redirect('/login')
    }
    User.findOne({
        where: {
            email
        }
        //needs to be async becasue it needs to wait until it is found
    }).then(async user => {
        // check if there is a user
        if(!user) {
            req.session.error = ['there is no user with that email'];
            return res.redirect('/login');
        }
        // check if the password works
        if ( password != user.password){
            req.session.errors = ['your password is incorrect'];
            return res.redirect('/login');
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