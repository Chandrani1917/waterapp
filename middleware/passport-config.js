const passport = require('passport');
const dotenv = require('dotenv');
const User = require('../modules/userSchema');
const { Strategy: jwtStrategy, ExtractJwt } = require('passport-jwt')

dotenv.config() 


var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN_SECRET_KEY
}


passport.use(new jwtStrategy( opts, async function (jwt_payload, done) {
    try {
        //find user by id from jwt payload

        const user = await User.findOne({ _id: jwt_payload._id }).select('-password')

        if (user) {

            return done(null, user)

        } else {

            return done(null, false)
        }

    } catch (error) {

        console.log(error, false);


    }
}

))