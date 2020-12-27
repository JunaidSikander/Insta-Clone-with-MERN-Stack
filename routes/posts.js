const express = require('express');
const postsRouter = express.Router();
const passport = require('passport');
const Posts = require('../models/posts');

postsRouter.post('/create_post', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const {title, body, photo} = req.body;
    if (!title || !body)
        return res.status(422).json({message: {msgBody: "Please add all the fields", msgError: true}});
    if (!photo)
        return res.status(422).json({message: {msgBody: "Please wait picture is uploading", msgError: true}});
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

postsRouter.get('/get_subscribed_posts', passport.authenticate('jwt', {session: false}), (req, res) => {
    Posts.find({postedBy: {$in: req.user.following}})
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

postsRouter.put('/like', passport.authenticate('jwt', {session: false}), (req, res) => {
    Posts.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    }, {
        new: true
    }).exec((err, post) => {
        if (err)
            return res.status(422).json({message: {msgBody: 'Error Occurred while updating post', msgError: true}});
        res.status(200).json(post);
    });
});

postsRouter.put('/unlike', passport.authenticate('jwt', {session: false}), (req, res) => {
    Posts.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    }, {
        new: true
    }).exec((err, post) => {
        if (err)
            return res.status(422).json({message: {msgBody: 'Error Occurred while updating post', msgError: true}});
        res.status(200).json(post);
    });
});

postsRouter.put('/comment', passport.authenticate('jwt', {session: false}), (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user
    };
    Posts.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true
    }).populate("comments.postedBy", "_id name")
        .populate('postedBy', '_id name')
        .exec((err, post) => {
            console.log('P ->', post);
            if (err)
                return res.status(422).json({message: {msgBody: err, msgError: true}});
            res.status(200).json(post);
        });
});

postsRouter.delete('/delete_post/:postId', passport.authenticate('jwt', {session: false}), (req, res) => {
    Posts.findOne({_id: req.params.postId})
        .populate('postedBy', '_id')
        .exec((err, post) => {
            if (err || !post)
                return res.status(422).json({message: {msgBody: err, msgError: true}});
            if (post.postedBy._id.toString() === req.user._id.toString())
                post.remove()
                    .then(result => res.status(200).json(result))
                    .catch(err => res.status(422).json({message: {msgBody: err, msgError: true}}))
        });
});
module.exports = postsRouter;
