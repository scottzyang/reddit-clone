/*
Set up testing environment for our app.
*/
// import assertion libraries to validate test and expected behaviors
const chai = require('chai');
const chaiHttp = require('chai-http'); // extension of Chai that has methods to make http requests.

// import functions from mocha to group tests and define single tests.
const { describe, it } = require('mocha');

// import our server so we can use chaiHttp
const app = require('../server');

// register chai-http with chai to access chai-http request methods via Chai.
chai.use(chaiHttp);

/*
HTTP agent establishes connection between client and server. Helps send HTTP requests to server.
We need an HTTP agent so that we can make requests from out tests to our server.
create HTTP agent from chai-http
*/
const agent = chai.request.agent(app);

// acquire the should assertion from Chai
const should = chai.should()

/*
it function takes description string and callback to execute assertions
https://mochajs.org/#asynchronous-code - information on done function parameter.
done - a function argument passed in by Mocha: returned with error is failure, returned is success.
use agent to make get request.
use end() to send request and receive response
if err, then return the error
else assert that status should be 200.
*/
describe('site', () => {
  it('Should have home page', (done) => {
    agent
      .get('/')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        return done();
      })
  })
})
