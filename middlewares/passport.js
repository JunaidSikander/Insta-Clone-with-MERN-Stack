const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');
const {JWT_SECRET} = require('../dev');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies)
        token = req.cookies["access_token"];
    return token
};

// Authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

//Authentication
passport.use(new LocalStrategy(({usernameField: 'email'}), (email, password, done) => {
    User.findOne({email}, (err, user) => {
        //if error occurs means something went wrong with database
        if (err)
            return done(err, {message: {msgBody: "Something went wrong with database", msgError: true}});
        //if user does not exist
        if (!user)
            return done(null, false, {message: {msgBody: "user does not exists with this email!", msgError: true}});
        //comparing password
        user.comparePassword(password, (err, isMatch) => {
            if (isMatch)
                return done(null, user);
            else
                return done(null, false, {message: {msgBody: "Password incorrect", msgError: true}})
        });
    })
}));
