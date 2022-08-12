const blog_router = require('express').Router()
const { text } = require('express')
const User = require('../models/User')



blog_router.post('/dashboard', (req , res) => {
    const {title, textArea} = req.body
    console.log("blog routing")


    // check to ensure there is text being sent over 

    if(!title, !textArea){
        res.status(400).json('You cannot leave any text area left blank')
        res.redirect('/')

    }
})

module.exports = blog_router