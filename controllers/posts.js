const Post = require('../models/post');

module.exports = (app) => {

  // INDEX
  /*
    uses find() to search for all posts. lean() converts into objects, as mongoose returns mongoose documents.
    then renders the posts-index template and sends in posts
  */
  app.get('/', async (req, res) => {
    try {
      let posts = await Post.find({}).lean()
      res.render('posts-index', { posts })
      console.log("Posts acquired successfully.")
    } catch (error) {
      console.log(error)
      console.log("Unable to query for posts.")
    }
  })

  // native promise syntax
  // app.get('/', (req, res) => {
  //   Post.find({}).lean()
  //     .then((posts) => res.render('posts-index', { posts }))
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  // })

  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
  });

  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    /*
      grabs the body of of the post request and inputs it into new instance of Post
      Post class expects an object, and destructures it.
    */
    console.log(req.body.title)
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    post.save();
    res.redirect('/');
  });

};
