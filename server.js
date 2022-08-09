//starting the server / express and port
const express = require('express');

const PORT = process.env.PORT || 8080

const path = require('path')
//set up the db_connection 
const db = require('./config/db_connection')
// setting up handlebars
const { engine } = require('express-handlebars');
// setting up cookies for users 
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store)

// not doing env ... yet ;)



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

app.use('/', view_routes);
// connection to the view router

// app.use('auth', auth_routes);






app.listen(PORT, () => console.log(`listening on port ${PORT}`));