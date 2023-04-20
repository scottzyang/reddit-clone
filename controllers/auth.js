const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = (app) => {
  // Sign up Form
  app.get('/sign-up', (req, res) => {
    res.render('sign-up');
  })

  // Sign Up Post
  app.post('/sign-up', async (req, res) => {
    try {
      const user = await new User(req.body);
      user.save();
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' }); // create a JWT with user ID signed with SECRET
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true }); // sets cookie in browser with JWT as value
      res.redirect('/'); // send response back to client
      console.log('New user created!');
    } catch (error) {
      console.error(error)
    }
  });
}
