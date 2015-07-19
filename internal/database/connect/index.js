var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Tracking');
module.exports = mongoose;