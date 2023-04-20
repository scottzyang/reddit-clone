const Post = require('../models/post');

module.exports = (app) => {

  // INDEX
  /*
    uses find() to search for all documents in the posts collection.
    lean() converts into JS objects, as mongoose returns mongoose documents with larger memory footprint and added functionality.
    then renders the posts-index template and sends in posts as arguments
  */
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean()
      res.render('posts-index', { posts })
      console.log("Posts acquired successfully.")
    } catch (error) {
      console.log(error)
      console.log("Unable to query for posts.")
    }
  })

  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
  });

  // CREATE
  app.post('/posts/new', async (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    /*
    Utilize constructor to create new instance of Post with the req.body object sent from
    submitting the form. Post will destructure the object and grab the required fields it needs based
    on the schema we established in post.js.
    */
    try {
      // Instantiate instance of Comment Model
      console.log(req.body.title)
      const post = await new Post(req.body);
      // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
      post.save();
      res.redirect('/');
    } catch (error) {
      console.error(error)
    }
  });

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments');
      res.render('posts-show', { post })
      console.log("Post show success")
    } catch (error) {
      console.error(error)
      console.log("Unable to show post.")
    }
  })

  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean()
      res.render('posts-index', { posts })
      console.log('Subreddit show success')
    } catch (error) {
      console.error(error)
      console.log("Unable to reach subreddit")
    }
  })

};
