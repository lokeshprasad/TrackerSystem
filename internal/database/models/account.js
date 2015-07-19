var mongoose = require('../connect'),
passportLocalMongoose = require('passport-local-mongoose'),
Schema = mongoose.Schema;

var Account = new mongoose.Schema({
		username : {type : String,required : true,index : {unique : true}},
		password : {type : String,required : true},
		verified : {type : Boolean,default:false}
	});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
