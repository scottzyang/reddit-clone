const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {

  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      // Instantiate instance of Comment Model and find associated Post
      const userID = req.user._id;
      const post = await Post.findById(req.params.postId);
      const comment = await new Comment(req.body);
      comment.author = userID;
      post.author = userID;

      // Add comment to posts
      post.comments.unshift(comment);
      post.save();

      // Save instance of Comment Model
      comment.save();
      res.redirect(`/posts/${post._id}`);
    } catch (error) {
      console.error(error)
    }
  })

};
