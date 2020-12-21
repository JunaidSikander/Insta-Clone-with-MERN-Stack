const express = require('express');
const postsRouter = express.Router();
const passport = require('passport');
const Posts = require('../models/posts');

postsRouter.post('/create_post', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {title, body, photo} = req.body;
    if (!title || !body || !photo)
        return res.status(422).json({message: {msgBody: "Please add all the fields", msgError: true}});
    const newPost = new Posts({
        title,
        body,
        photo,
        postedBy: req.user
    });
    newPost.save(err => {
        if (err)
            return res.status(422).json({message: {msgBody: "Some error occurred while saving Post", msgError: true}});
        return res.status(200).json({message: {msgBody: "Post uploaded", msgError: false}});
    })
});

postsRouter.get('/get_all_posts', passport.authenticate('jwt', {session: false}), (req, res) => {
    Posts.find()
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
            if (err)
                return res.status(422).json({
                    message: {
                        msgBody: "Some error occurred while getting Posts",
                        msgError: true
                    }
                });
            if (!posts)
                return res.status(422).json({message: {msgBody: "nothing posted", msgError: true}});
            return res.status(200).json(posts);
        })
});

postsRouter.get('/my_posts', passport.authenticate('jwt', {session: false}), (req, res) => {
    Posts.find({postedBy: req.user._id})
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
            if (err)
                return res.status(422).json({
                    message: {
                        msgBody: "Some error occurred while getting Posts",
                        msgError: true
                    }
                });
            if (!posts)
                return res.status(422).json({message: {msgBody: "No Post uploaded", msgError: true}});
            return res.status(200).json(posts);
        })
});
module.exports = postsRouter;
