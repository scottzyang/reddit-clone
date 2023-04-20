const Post = require('../models/post');

module.exports = (app) => {

  // INDEX
  /*
    uses find() to search for all documents in the posts collection.
    lean() converts into JS objects, as mongoose returns mongoose documents with larger memory footprint and added functionality.
    then renders the posts-index template and sends in posts as arguments
  */
  app.get('/', async (req, res) => {
    const currentUser = req.user;

    try {
      const posts = await Post.find({}).lean().populate('author');
      res.render('posts-index', { posts, currentUser })
      console.log("Posts acquired successfully.")
    } catch (error) {
      console.log(error)
      console.log("Unable to query for posts.")
    }
  })

  // NEW
  app.get('/posts/new', (req, res) => {
    const currentUser = req.user;
    if (currentUser) {
      res.render('posts-new', { currentUser });
    } else {
      return res.redirect('/login'); // redirect to login page
    }
  });

  // CREATE
  app.post('/posts/new', async (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    /*
    Utilize constructor to create new instance of Post with the req.body object sent from
    submitting the form. Post will destructure the object and grab the required fields it needs based
    on the schema we established in post.js.
    */
   if (req.user) {
    try {
      // Instantiate instance of Post Model
      const userID = req.user._id;
      const post = await new Post(req.body);
      post.author = userID;
      // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
      post.save();
      res.redirect(`/posts/${post._id}`);
    } catch (error) {
      console.error(error)
    }
   } else {
    return res.redirect('/login'); // redirect to login page
   }

  });

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    const currentUser = req.user;
    try {
      // populate grabs document from associated field, path: determines what field to populate, and the populate option determines what nested field to pop.
      const post = await Post.findById(req.params.id).lean().populate({ path: 'comments', populate: { path: 'author' } }).populate('author');
      res.render('posts-show', { post, currentUser })
      console.log("Post show success")
    } catch (error) {
      console.error(error)
      console.log("Unable to show post.")
    }
  })

  app.get('/n/:subreddit', async (req, res) => {
    const currentUser = req.user;
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean().populate('author')
      res.render('posts-index', { posts, currentUser })
      console.log('Subreddit show success')
    } catch (error) {
      console.error(error)
      console.log("Unable to reach subreddit")
    }
  })

};
