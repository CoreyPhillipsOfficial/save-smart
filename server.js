const express = require("express");
const db = require('./config/connection')
const methodOverride = require('method-override');

const { engine } = require("express-handlebars");

const session = require('express-session');

// Import View/User/Goal Routes
const view_routes = require('./controllers/view_routes');
const user_routes = require('./controllers/user_routes');
const goal_routes = require('./controllers/goal_routes');


// Create the port number and prepare for heroku with the process.env.PORT value
const PORT = process.env.PORT || 3001;


// Create the server app
const app = express();

// Open the static channel for our browser assets - ie. express.static on the public folder
app.use(express.static('public'));

// this is how we need to send it when using handlebars since it sends the data through urlencoding
app.use(express.urlencoded({extended: false}));

// Method Override Package to change Method in form
app.use(methodOverride('_method'));

// Load express-session middleware
app.use(session({
    secret: 'someSecretKey',
    resave: false,
    saveUninitialized: true
  }))

// Set up Handlebars as the view engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Load our view routes at the root level '/'
app.use('/', [view_routes, goal_routes]);

// Load our user routes at the root level '/'
app.use('/auth', user_routes);

// Sync and create tables
db.sync({force: false})
.then(() => {
  // Start the server and log the port that it started on
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});