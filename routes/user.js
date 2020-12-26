const express = require('express');
const passport = require('passport');
const Posts = require('../models/posts');
const User = require('../models/user');

userRouter = express.Router();

userRouter.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({_id: req.params.id})
        .select('-password')
        .then(user => {
            Posts.find({postedBy: req.params.id})
                .populate('postedBy', '_id name')
                .exec((err, posts) => {
                    if (err)
                        return res.status(422).json({message: {msgBody: err, msgError: true}});
                    return res.status(200).json({user, posts})
                })
        })
});

userRouter.put('/follow', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, {
        new: true
    }, (err, ressult) => {
        if (err)
            return res.status(422).json({message: {msgBody: err, msgError: true}});
        User.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.followId}
        }, {
            new: true
        }).select('-password')
            .exec((err, result) => {
                if (err)
                    return res.status(422).json({message: {msgBody: err, msgError: true}});
                return res.status(200).json(result)
            })
    })
});

userRouter.put('/unfollow', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $pull: {followers: req.user._id}
    }, {
        new: true
    }, (err, result) => {
        if (err)
            return res.status(422).json({message: {msgBody: err, msgError: true}});
        User.findByIdAndUpdate(req.user._id, {
            $pull: {following: req.body.followId}
        }, {
            new: true
        }).select('-password')
            .exec((err, result) => {
                if (err)
                    return res.status(422).json({message: {msgBody: err, msgError: true}});
                return res.status(200).json(result)
            })
    })
});

module.exports = userRouter;
