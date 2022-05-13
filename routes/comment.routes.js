const router = require("express").Router();

const User = require("../models/User.model");
const Article = require("../models/Article.model");
const Comment = require("../models/Comment.model")
const isLoggedIn = require("../middleware/isLoggedIn");

router.post('/comments', isLoggedIn, (req, res, next) => {

    const { author, content, articleId } = req.body;

    let user = req.session.currentUser;

    Comment.create({ author, content, article: articleId})
    .then(newComment => {
        return Article.findByIdAndUpdate(articleId, { $push: { comments: newComment._id } } );

    })
    .then(response => res.json(response))
    .catch(err => console.log(err));
});

// router.post('/articles/:articleId/comment', isLoggedIn, (req, res, next) => {
//     const { articleId } = req.params;
//     const { author, content } = req.body;

//     let user = req.session.currentUser;

//     Article.findById(postId)
//     .then(dbArticle => {
//         let newComment;

//         newComment = new Comment({ author: user._id, content });

//         newComment
//         .save()
//         .then(dbComment => {
//             dbPost.comments.push(dbComment._id);

//             dbPost
//                 .save()
//                 .then(response => res.res.json(response))
//         })
//         .catch(err => {
//         console.log(`Error while creating comment: ${err}`);
//         next(err);
//         })
//     });
// })

// router.post('/posts/:postId/comment/delete', isLoggedIn, (req, res, next) => {
//     const { postId } = req.params;

//     Comment.findByIdAndDelete(postId)
//         .then(() => res.redirect('/posts'))
//         .catch(err => next(err));
// });

module.exports = router;