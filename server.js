const express = require("express");
// const routes = require('./controllers');
const db = require('./config/connection')
const session = require('express-session');
const { engine } = require("express-handlebars");
const PORT = process.env.PORT || 3333;

const app = express();


// Set up Handlebars as the view engine
app.engine(".hbs", engine({extname: 'hbs'}))
app.set("view engine", "hbs");
app.set('views', './views')

app.use(express.json())
app.use(express.static('public'));
app.use(session({
    secret: 'Chunky cat',
    resave: false,
    saveUninitialized: true
}));



// app.use('/', routes)

db.sync().then(() => {
    app.listen(PORT, () => console.log("Server is running on port", PORT));
})
