const config =require('./db');
const User =require('../models/user');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport){
	var opts = {} //створюється порожній обєкт
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//який тит авторизації використовується
	opts.secretOrKey = config.secret;// секретний ключ
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	    User.findOne({id: jwt_payload.sub}, function(err, user) { // пошук користувача з однаковим id який намагається авторизуватися
	        if (err) {
	            return done(err, false);
	        }
	        if (user) {
	            return done(null, user);
	        } else {
	            return done(null, false);
	            // такого користувача не знайдено
	        }
	    });
	}));
}