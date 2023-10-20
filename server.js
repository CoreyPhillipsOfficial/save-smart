const express = require("express");
// // Import our view_routes
// const { view_routes, user_routes } = require('./controllers');
const db = require('./config/connection')
const session = require('express-session');
const { engine } = require("express-handlebars");

// Create the port number and prepare for heroku with the process.env.PORT value
const PORT = process.env.PORT || 3333;


// Create the server app
const app = express();


const User = require('./models/User');


// Set up Handlebars as the view engine
app.engine(".hbs", engine({extname: 'hbs'}))
app.set("view engine", "hbs");
app.set('views', './views')


// Allow JSON to be sent from the client
app.use(express.json())

// Open the static channel for our browser assets - ie. express.static on the public folder
app.use(express.static('public'));
app.use(session({
    secret: 'Chunky cat',
    resave: false,
    saveUninitialized: true
}));


// // Load our view routes at the root level '/'
// app.use('/', view_routes);

// // Load our user routes at the root level '/'
// app.use('/auth', user_routes);


db.sync().then(() => {
    app.listen(PORT, () => console.log("Server is running on port", PORT));
})
