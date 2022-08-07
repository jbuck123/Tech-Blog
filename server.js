//starting the server / express and port
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080
// setting up handlebars
const { engine } = require('express-handlebars');

app.engine('hbs', engine({extname: 'hbs'}));
app.set('view engine', 'hbs')

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