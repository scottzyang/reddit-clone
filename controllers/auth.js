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

  // Log out
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    return res.redirect('/');
  });

  // Login
  app.get('/login', (req, res) => {
    res.render('login');
  });

  // LOGIN
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body; // grab username and password from body
      const user = await User.findOne({ username }, 'username password') // Find a username and return the fields username and password.
      if (!user) { // If user doesn't exist, send error status
        return res.status(401).send({ message: "Wrong Username or Password" });
      }
      user.comparePassword(password, (err, isMatch) => { // Check password against user database password
        if (!isMatch) {
          return res.status(401).send({ message: "Wrong Username or Password" }); // password does not match
        }
        const token = jwt.sign({  _id: user._id, username: user.username }, process.env.SECRET, {  // Create token
          expiresIn: '60 days',
        });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true }); // Set cookie in browser and redirect to root
        return res.redirect('/');
      });
    } catch (error) {
      console.error(error);
    }
  });
}
