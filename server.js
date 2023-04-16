// require libraries
const express = require('express');
const { engine } = require('express-handlebars');

// set up instance of express app
const app = express();

// Middleware
app.engine('handlebars', engine()); // register view engine for rendering HTML pages
app.set('view engine', 'handlebars'); // set view engine for application
app.set('views', './views'); // set path for location of views
app.use(express.json()); // middleware to parse JSON. Client requests with JSON are parsed and available in req.body automatically.
app.use(express.urlencoded({ extended: false })); // parses urlencoded data typically submit via HTML forms. Makes available in req.body. Extended false uses simple querystring library to parse urlencoded payload.

// require controllers
require('./controllers/posts')(app);

// link database
require('./data/reddit-db');

// route to home
app.get('/', (req, res) => {
    res.render('home');
});

// CASES RESOURCE

// CREATE
app.post('/cases', (req, res) => {
  console.log("We did it")

  res.redirect(`/cases/${caseId}`)
});


app.listen(3000);
