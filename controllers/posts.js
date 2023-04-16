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

  // native promise syntax
  // app.get('/', (req, res) => {
  //   Post.find({}).lean()
  //     .then((posts) => res.render('posts-index', { posts }))
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  // })

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean()
      res.render('posts-show', { post })
      console.log("Post show success")
    } catch (error) {
      console.error(error)
      console.log("Unable to show post.")
    }
  })
  // app.get('/posts/:id', (req, res) => {
  //   Post.findById(req.params.id).lean()
  //     .then((post) => {
  //       res.render('posts-show', { post })
  //     })
  //     .catch((err) => {
  //       console.error(err.message)
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
    Utilize constructor to create new instance of Post with the req.body object sent from
    submitting the form. Post will destructure the object and grab the required fields it needs based
    on the schema we established in post.js.
    */
    console.log(req.body.title)
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    post.save();
    res.redirect('/');
  });

};
