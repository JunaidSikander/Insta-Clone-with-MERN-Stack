const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../middlewares/passport');
const {JWT_SECRET} = require('../dev');

const signToken = userID => {
    return JWT.sign({
        iss: 'junaid',
        sub: userID
    }, JWT_SECRET, {expiresIn: '1h'})
};

authRouter.post('/signup', (req, res) => {
    const {name, email, password, pic} = req.body;
    if (!email || !password || !name)
        return res.status(422).json({message: {msgBody: "Please add all the fields", msgError: true}});
    User.findOne({email}, (err, user) => {
        if (err)
            return res.status(422).json({message: {msgBody: "Some error has occurred", msgError: true}});
        if (user)
            return res.status(422).json({message: {msgBody: "User is already exists with this email", msgError: true}});
        const newUser = new User({name, email, password, pic});
        newUser.save(err => {
            if (err)
                return res.status(422).json({message: {msgBody: "Some error occurred while saving", msgError: true}});
            else
                return res.status(200).json({message: {msgBody: "Account Saved Successfully", msgError: false}})
        });
    });
});

authRouter.post('/signin', (req, res) => {
    const {email, password} = req.body;
    if (!email || !password)
        return res.status(422).json({message: {msgBody: "Please add email or password", msgError: true}});
    passport.authenticate("local", function (err, user, info) {
        if (err)
            return res.status(402).json({
                message: {
                    msgBody: "Some error occurred while authenticating",
                    msgError: true
                }
            });
        if (user) {
            const {_id, email, name, followers, following, pic} = user;
            const token = signToken(_id);
            res.cookie('access_token', token, {httpOnly: true, sameSite: true});
            res.status(200).json({
                isAuthenticated: true,
                user: {name, email, pic, followers, following},
                message: {msgBody: 'Successfully Signed In', msgError: false}
            });
        } else {
            res.status(401).json({info, message: {msgBody: 'unAuthorized Please Signed in', msgError: true}});
        }
    })(req, res);
});

authRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {_id, name, email, followers, following, pic} = req.user;
    res.status(200).json({isAuthenticated: true, user: {_id, name, email, followers, following, pic}})
});
authRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({user: {name: "", email: ""}, success: true});
});
module.exports = authRouter;
