var db = require('../database/models');
var util = require('../../libs/util');
var email = require('../../libs/email');

module.exports.create_account = function (accountParms, cb) {
	db.Account.findOne({
		'username' : accountParms.username
	}, function (err, account) {
		if (err) {
			cb(err, null);
		}
        console.log(account);
		if (account != null && account.verified) {
			return cb('Username in use!!', null);
		} 	
		else if (account == null) {
			var account = new db.Account();
			account.verify_token = util.new_guid();
		}
		account.promotional_code = accountParms.promotional_code;
		account.nick_name = accountParms.nick;
		account.username = accountParms.username;
		account.password = accountParms.password;
		account.save(function (err, user) {
			if (err) {
				return cb(err, null)
			};
			if (user != null) {
				/*send_verification_email(user.username, user.verify_token, function(err){
					console.log(err);
				});*/
				return cb(null, user.verify_token);
			}
		});
	});
}

module.exports.verify_email = function (username, verify_token, cb) {
	db.Account.findOne({
		'username' : username
	}, function (err, account) {
		if (err) {
			return cb(err);
		}
		if (account.verify_token == verify_token) {
			account.verified = true;
			account.save(function (err, user) {
				if (err) {
					return cb(err);
				}
				return cb(null);
			});
		}
		else{
		return cb('some error occured');
		}
	});
}

function send_verification_email(to, verify_token, cb) {

var subject = "Welcome To Pocket";
var message = 'Hi ' + to  + "<br>" 
				+ "<br>" 
				+ "Please verify your email to continue." + "<br>"
				+ "<br>"
				+ "Email : " + to + "<br>"
				+ "Verification Code : " + verify_token + "<br>"
				+ "<br>"
				+ "Alternatively, You can click on the link below to verify" + "<br>"
				+ "/verifyemail?username=" + to + "&verify_token=" + verify_token + "." + "<br>"
				+ "<br>"
				+ "Best," + "<br>"
				+ "Team";
				
email.send_email(to, subject, message, function(err){
if(err){
	console.log(err);
}
});
}

module.exports.login = function (data, cb) {
	db.Account.findOne({username : data.username, password : data.password}, function(err, account){
		if(err){
			console.log(err);
			return cb(err, null);
		}
		else if(account == null){
			return cb(null, null);
		}
		else{
			return cb(null, account);
		}

	})
}