//starting the server / express and port
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

const path = require('path')
//set up the db_connection 
const db = require('./config/db_connection')
// setting up handlebars
const { engine } = require('express-handlebars');



app.engine('hbs', engine({extname: 'hbs'}));
app.set('view engine', 'hbs')
//shares the front end files with the client side (insomnia practice)
app.use(express.static(path.join('front')));
// the req.body
app.use(express.json());
// Allow form data to be sent through and also allow object/array data - req.body
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));