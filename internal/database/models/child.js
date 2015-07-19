var mongoose = require('../connect'),
    Schema = mongoose.Schema;

var Child = new mongoose.Schema({
    name : {
        type : String
    },
	email : {
		type : String
	},
	phone : {
		type : String
	}
});


module.exports = mongoose.model('Child', Child);
