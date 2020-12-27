const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
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
    },
    pic: {
        type: String,
        default: 'https://res.cloudinary.com/junaidsikander/image/upload/v1609053233/deault_mqrohv.png'
    },
    followers: [{type: ObjectId, ref: 'User'}],
    following: [{type: ObjectId, ref: 'User'}]
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, hashPassword) => {
        if (err)
            return next(err);
        this.password = hashPassword;
        next();
    })
});
userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
    })
};

module.exports = mongoose.model('User', userSchema);
