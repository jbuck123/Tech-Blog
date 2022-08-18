const auth_router = require('express').Router();
const User = require("../models/User");
const { isLoggedIn } = require('./helpers');
// finish helpers file // is logged
// try to get the register rought 

// why is this not working?

// auth_router.get('/user' (req, res) => {
//     User.findAll()
//     .then(user => {
//         res.status( 200 ).json( user )
//     })
// })


auth_router.post('/register', isLoggedIn, (req, res) => {
    const { username, email, password} = req.body;
    console.log(req.body)
    if (!username || !email || !password) {
        // if empty text area return errors 
        console.log('error')
        req.session.errors = ['please enter username/ email / password']
        return res.redirect('/register')
    }

    // check if the email is taken 

    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if (user) {
            req.session.errors = [" that email is in use"]
            console.log('error email taken')

            return res.redirect('/login')
        }

        // could you check for same username?

        
            console.log(req.body)
            //create the new user 
            User.create(req.body)
                .then(new_user => {
                    req.session.save(() => {
                        // stores user id in the session object / used to check ifloggedin
                        req.session.userId = new_user.id;
                        res.redirect('/');
                    });
                })
                .catch(err => {
                    console.log(err)

                    // these session.errors is supposed to display to the user via handlebars
                    // could use  a refresh on how 
                    req.session.errors = err.errors.map(err => err.message);
                    res.redirect('/register')
                });
        });
    });




//cannot test the login even though i have seeded users to the the database... >:l
// lets test the login
//create user?
auth_router.post('/login', isLoggedIn, (req,res) => {
    console.log("loggin in")
    // const { email, password} = req.body;
console.log(req.body.email)
console.log(req.body.password)
    if(!req.body.email || !req.body.password) {
        //attach erros to the session object
        req.session.errors = ['invalid username or password.'];
        return res.redirect('/login')
    }
    User.findOne({
        where: {email: req.body.email}
        //needs to be async becasue it needs to await for user.validatePassword
    }).then(async user => {
        console.log(user)
        // check if there is a user
        if(!user) {
            req.session.error = ['there is no user with that email'];
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
                res.redirect('/');
                console.log('back to the homepage with the new user')

                // session and attach the user id to the session object 
                // once the user is validated and no errors have occured, we start a new 

            })
        }
    })
})
auth_router.get('/logout', (req,res) => {
    if(!req.session.userId) return res.redirect('/')
    req.session.destroy(() => {
        res.redirect('/')
        // i think that this needs to be expanded more
    })
})



module.exports = auth_router;