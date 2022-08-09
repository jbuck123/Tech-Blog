//starting the server / express and port
const express = require('express');

const PORT = process.env.PORT || 8080

const path = require('path')
//set up the db_connection 
const db = require('./config/db_connection')
// setting up handlebars
const { engine } = require('express-handlebars');
// setting up cookies for users 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

require('dotenv').config();




// pull in my routes ]
const { view_routes, auth_routes} = require("./controllers");



const app = express();

app.engine('hbs', engine({extname: 'hbs'}));
app.set('view engine', 'hbs')
//shares the front end files with the client side (insomnia practice)
app.use(express.static(path.join('front')));
// the req.body
app.use(express.json());
// Allow form data to be sent through and also allow object/array data - req.body
app.use(express.urlencoded({ extended: false }));
// this gives us access to req.session on our routes
app.use(session({
    secret: process.env.SESSION_SECRET,
    // compares session secret to client-side cookie to authenticate user
    store: new SequelizeStore({ db }),
    // stores our session data to the database instead of using server system memory, that is why 
    // there is a session row in tables_in_login_db
    saveUninitialized: false,
    // keeps the sequelize store from deleting idle session data
    resave: false,
    // the cookie object allows us to maniupulate teh client-side cookie -set experation, 
    // not accesible to client JS
    cookie: {
        httpOnly: true
    }
}));






app.use('/', view_routes);
// connection to the view router

app.use('auth', auth_routes);




//what is this doing again?

db.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
})