const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')

authRouter.post('/signup', (req,res) => {
    const {name, email, password} = req.body
    if(!email || !password || !name)
        return res.status(422).json({message: {msgBody: "Please add all the fields", msgError: true}});
    User.findOne({email}, (err,user) => {
        if(err)
            return res.status(500).json({message: {msgBody: "Some error has occured", msgError: true}});
        if(user)
            return res.status(422).json({message: {msgBody: "User is already exists with this email", msgError: true}});
        newUser = new User({name, email, password})
        newUser.save(err => {
            if(err)
                return res.status(500).json({message: {msgBody: "Some error occured while saving", msgError: true}});
            else
               return res.status(200).json({message: {msgBody: "Account Saved Successfully", msgError: false}}) 
        })
    })
    
});

module.exports = authRouter;