// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
    username: {
		type: String,
		required: true
	},
    password: {
	type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    img: {
        type: String,
        default: 'uploads/avatars/avata.png'
    }
});

user.plugin(passportLocalMongoose);

var user = module.exports = mongoose.model('user', user);

module.exports.getUser = (callback, limit) => {
	user.find(callback).limit(limit);
}
module.exports.removeUser = (id, callback) => {
    var query = {
        _id: id
    };
    user.remove(query, callback);
}
