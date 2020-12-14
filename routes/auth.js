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

authRouter.post('/signin',(req,res) => {
    const {email,password} = req.body;
    if(!email || !password)
        return res.status(422).json({message: {msgBody: "Please add email or password" , msgError: true}})
    User.findOne({email}, (err,user) => {
        if(err)
            return res.status(402).json({message: {msgBody: "Some error occured while finding user" , msgError: true}});
        if(!user)
            return res.status(402).json({message: {msgBody: "User does not exists with this email" , msgError: true}})
        user.comparePassword(password, (err, user) => {
            if(err)
                console.log(err);
            if(!user)
                return res.status(402).json({message: {msgBody: "incorrect password" , msgError: true}});
            return  res.status(200).json({message: {msgBody: "Successfully Login" , msgError: false}});
        });
    })

})
module.exports = authRouter;