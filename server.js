const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

// CASES RESOURCE


// NEW
app.get('/cases/new', (req, res) => {
  res.render('cases-new', {});
})

// CREATE
app.post('/cases', (req, res) => {
  console.log("We did it")

  res.redirect(`/cases/${caseId}`)
});

// SHOW

// EDIT

// UPDATE

// DESTROY



app.listen(3000);
