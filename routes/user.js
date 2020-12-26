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
                .catch(err => console.log(err))
        })
});

module.exports = userRouter;
