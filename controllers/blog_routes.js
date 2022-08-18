const blog_router = require('express').Router()
const Blog = require('../models/Blog')
// const { text } = require('express')
const User = require('../models/User')
const { isLoggedIn } = require('./helpers')



blog_router.post('/blog', isLoggedIn,  (req , res) => {
    const {title, textArea} = req.body
    console.log("blog routing")

    // create new book 

 Blog.create({
   // creating new blog in the DB
    ...req.body, userId: req.session.userId
}).then((data) => {
    res.json(data)

    console.log(data)
    // need to redirect myself back to the dashboard
    res.redirect("/dashboard")
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

blog_router.get('/blog',  (req, res) => {
    console.log('hello')
    Blog.findAll()
    .then((items) => {
        const posts = items.map((item) =>{
            console.log(item.get({plain: true}))
            item.get({plain: true})
            // res.json(items);
        })
        console.log(posts)
        res.render('index', { posts })
        });
    // .catch((err) => res.status(404).json(err))
})

module.exports = blog_router