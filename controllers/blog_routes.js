const blog_router = require('express').Router()
const Blog = require('../models/Blog')
// const { text } = require('express')
const User = require('../models/User')
const { isLoggedIn } = require('./helpers')



blog_router.post('/blog', isLoggedIn,  (req , res) => {
    const {title, textArea} = req.body
    console.log("blog routing")
 Blog.create({
    // this is de
    ...req.body, userId: req.session.userId
}).then((data) => {
    res.json(data)
})
.catch(err => {
    console.log(err)
    
})
console.log(req.body)
  


    // check to ensure there is text being sent over 

    if(!title, !textArea){
        res.status(400).json('You cannot leave any text area left blank')
        res.redirect('/')

    }
})

blog_router.get('/blog', isLoggedIn, (res, req) => {
    Blog.findAll()
    .then((items) => {
        console.log(items)
        res.JSON(items);

    })
    // .catch((err) => res.status(404).json(err))
})

module.exports = blog_router