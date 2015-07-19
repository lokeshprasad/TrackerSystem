var mongoose = require('../connect'),
	Schema = mongoose.Schema;

var Journey = new mongoose.Schema({
	to : {
		type : String
	},
	from : {
		type : String
	},
	child : {
		type : Schema.Types.ObjectId,
		ref : 'Child'
	},
	parent : {
		type : Schema.Types.ObjectId,
		ref : 'Parent'
	}
});


module.exports = mongoose.model('Journey', Journey);
