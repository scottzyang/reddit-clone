// test/posts.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, after, before } = require('mocha');
chai.use(chaiHttp);
const app = require('../server');
const agent = chai.request.agent(app);

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require('../models/post');
const User = require('../models/user')

const should = chai.should();

describe('Posts', () => {
  const newUser = {
    username: "testone",
    password: "password"
  }

  // create new user, and logs in. Created post will then be associated with this user.
  before(function (done) {
    agent
      .post('/sign-up')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(newUser)
      .then((res) => {
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  const newPost = {
    title: "Post Title Test",
    url: "https://www.post-test.com",
    summary: "post summary",
    subreddit: "testreddit",
  };

  it('should create a valid post and save to database at POST /posts/new', (done) => {
    Post.estimatedDocumentCount() // get number of existing docs
      .then((initialDocCount) => { // number of docs passed in to then
        agent
          .post('/posts/new') // chai-http agent post request is made to path
          .set('content-type', 'application/x-www-form-urlencoded') // set content type to urlencoded form data to emulate data submission
          .send(newPost) // send post data to database
          .then((res) => { // capture response
            Post.estimatedDocumentCount() // grab new count
              .then((newDocCount) => { // new count passed in
                res.should.have.status(200); // verify status 200
                newDocCount.should.equal(initialDocCount + 1); // verify new count
                done()
              })
              .catch((err) => {
                done(err);
              });
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  after(() => {
    // Post.findOneAndDelete(newPost);
    Post.deleteOne({  title: newPost.title })
      .then(() => done())
      .catch((err) => done(err));

    User.deleteOne({  username: newUser.username })
      .then(() => done())
      .catch((err) => done(err));

    agent.close();
  })
});
