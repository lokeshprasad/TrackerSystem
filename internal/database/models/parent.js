var mongoose = require('../connect'),
	Schema = mongoose.Schema;

var Parent = new mongoose.Schema({
	name : {
		type : String
	},
	email : {
		type : String
	},
	phone : {
		type : Number
	}
});


module.exports = mongoose.model('Parent', Parent);
