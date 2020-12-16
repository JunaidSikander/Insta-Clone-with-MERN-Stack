const express = require('express');
const postsRouter = express.Router();
const passport = require('passport');
const Posts = require('../models/posts');

postsRouter.post('/create_post', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {title, body} = req.body;
    if (!title || !body)
        return res.status(422).json({message: {msgBody: "Please add the title or body fields", msgError: true}});
    const newPost = new Posts({
        title,
        body,
        postedBy: req.user
    });
    newPost.save(err => {
        if (err)
            return res.status(422).json({message: {msgBody: "Some error occurred while saving Post", msgError: true}});
        return res.status(200).json({message: {msgBody: "Post uploaded", msgError: false}});
    })
});

module.exports = postsRouter;
