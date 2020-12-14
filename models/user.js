const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next){
  if(!this.isModified('password'))
    return next();
  bcrypt.hash(this.password,10, (err,hashPassword) => {
    if(err)
      return next(err);
    this.password = hashPassword
    next();
  })
});

module.exports =  mongoose.model('User',userSchema)