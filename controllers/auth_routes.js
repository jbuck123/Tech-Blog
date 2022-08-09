const auth_router = require('express').Router();
const User = require("../models/User");
// finish helpers file // is logged

// lets test the login

auth_router.post('/login', (req,res) => {
    const { email, password} = req.body;

    if(!email || !password) {
        req.session.errors = ['invalid username or password.'];
    }
})


module.exports = auth_router;