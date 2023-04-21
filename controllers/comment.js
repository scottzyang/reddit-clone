const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {

  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    if (req.user) {
      const comment = new Comment(req.body);
      comment.author = req.user._id;
      try {
        const post = await Post.findById(req.params.postId);
        post.comments.unshift(comment);
        await Promise.all([comment.save(), post.save()]);
        res.redirect(`/posts/${req.params.postId}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      res.redirect('/login');
    }

  });


};
