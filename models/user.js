const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
}, { timestamps: true });

// Must use function expressions here
userSchema.pre('save', function (next) { // middleware function to be executed before save event is triggered on userSchema
  // Encrypt Password
  // "this" refers to the document being saved.
  const user = this; // set "this" (user document being save) to user

  // verify if user has changed password
  if (!user.isModified('password')) { // checks if password has been modified
    return next(); // if not, then move onto next function in stack.
  }
  bcrypt.genSalt(10, (err, salt) => { // genSalt runs password hashing 10 times, and passes a randomly generated "salt" into callback
    bcrypt.hash(user.password, salt, (_, hash) => { // user pass and salt gets hashed and passed as second arg into callback
      user.password = hash; // set new user pass to hashed password
      next();
    });
  });
});

// Authenticate login, compare user entered password to database password.
// Need to use function to enable this.password to work.
userSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = model('User', userSchema);
