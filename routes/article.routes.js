const router = require("express").Router();
const mongoose = require("mongoose");
const Article = require('../models/Article.model');
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js"); 
const { response } = require("../app");
const { update } = require("../models/User.model");


router.get("/articles", (req, res, next) => {

        Article.find()
        .populate('author')
        .then((allArticles) => res.json(allArticles))
        .catch((err) => console.log(`error while displaying the article: ${err}`));

});


router.post('/articles/create', isAuthenticated, (req, res, next) => {
    const { title, content, summary } = req.body;
    const  id  = req.payload._id;

        Article.create({ title, content, summary })
        .then(response => res.json(response))
        .then(dbArticle => {
            return User.findByIdAndUpdate(id, { $push: { articles: dbArticle._id } });
        })
        .catch(err => {
            throw new Error(`Error while creating the post! ${err}`);
        });

});


router.get('/articles/:articleId', (req, res, next) => {
    const { articleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Article.findById(articleId)
        .populate('author')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User'
            }
        })
        .then(article => res.status(200).json(article))
        .catch(err => res.json(err))
});


router.put('/articles/:articleId', isAuthenticated, (req, res, next) => {
    const { articleId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Article.findByIdAndUpdate(articleId, req.body, { new: true })
        .then(updatedArticle => res.json(updatedArticle))
        .catch(err => res.json(err));
});


router.delete('/articles/:articleId', isAuthenticated, (req, res, next) => {
    const { articleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Article.findByIdAndRemove(articleId)
    .then(() => res.json({ message: `Article with ${articleId} is removed successfully.` }))
    .catch(error => res.json(error));
});


module.exports = router;

