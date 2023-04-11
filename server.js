// require libraries
const express = require('express');
const { engine } = require('express-handlebars');

// set up app
const app = express();

// Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// require controllers
require('./controllers/posts')(app);

// link database
require('./data/reddit-db');

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
