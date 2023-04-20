const jwt = require('jsonwebtoken');

// check authentication, used for routes that require auth.
const checkAuth = (req, res, next) => {
  console.log('Checking authentication');
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) { // check if undefined or null
    req.user = null; // user is not authenticated, set to null
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {}; // decode passed in token, complete: true also decodes header info. Returns decoded object containing the info.
    req.user = decodedToken.payload; // this sets req.user to the decoded token payload
  }
  next();
};

module.exports = checkAuth;
