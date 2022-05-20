const router = require("express").Router();

const User = require("../models/User.model");
const Article = require("../models/Article.model");
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post(
  "/articles/:articleId/comment",
  isAuthenticated,
  (req, res, next) => {
    const { articleId } = req.params;
    const { content } = req.body;
    const author = req.payload._id;

    Comment.create({ author, content, article: articleId })
      .then((newComment) => {
        Article.findByIdAndUpdate(articleId, {
          $push: { comments: newComment._id },
        })
          .then((response) => {
            const copyComment = newComment.toObject();
            copyComment.author = {
              name: req.payload.name,
            };
            res.json(copyComment);
          })

          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);


router.delete('/articles/:articleId/comment', isAuthenticated, (req, res, next) => {
    const { articleId } = req.params;

    Comment.findByIdAndRemove(articleId)
        .then(() => res.json({ message: "Your comment has been deleted." }))
        .catch(err => next(err));
});

module.exports = router;
