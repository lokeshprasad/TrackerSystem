var fs = require('fs');

/**
 * Make directory if it doesn't exist already.
 *
 * @param {String} path The path to the directory.
 */
module.exports.mkdir = function (path) {
	try {
		fs.statSync(path);
	} catch (e) {
		if (e.code === 'ENOENT') {
			fs.mkdirSync(path);
		}
	}
};

module.exports.new_guid = function generate_guid() {
	var guid = 'xxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	return guid;
}

module.exports.generate_secret_key = function generate_secret_key() {
	var guid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	return guid;
}


