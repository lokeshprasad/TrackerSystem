var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../database/models');
var global = require('../../global');

module.exports.authenticate = function (username, password, done) {
	console.log(username);
	db.Account.findOne({
		username : username
	}, function (err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {
				message : global.invalid_username
			});
		}
		if (user.password != password) {
			return done(null, false, {
				message : global.invalid_password
			});
		}
		if (user.verified == false) {
			return done(null, false, {
				message : global.user_not_verified
			});
		}
		return done(null, user);
	});
}
