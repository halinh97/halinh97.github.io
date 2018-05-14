'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productUsers = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type:String
    },
    product: [],
    create_date: {
        type: Date,
        default: Date.now
    }
});

var productUsers = module.exports = mongoose.model('productUsers', productUsers);

module.exports.getProduct = (callback, limit) => {
    productUsers.find(callback).limit(limit);
}

// module.exports.getProductById = (id, callback) => {
//
//     productUsers.find({'idUser': ObjectId("id")}, callback);
// }

module.exports.addProduct = (product, callback) => {
    productUsers.create(product, callback);
}

module.exports.updateproductUsers = (id, productUsers, options, callback) => {
    var query = {
        _id: id
    };
    var update = {
        idUser: productUsers.name,
        product: productUsers.product,
        create_date: productUsers.create_date

    }
    productUsers.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeProductUser = (id, callback) => {
    var query = {
        _id: id
    };
    productUsers.remove(query, callback);
}
//mongoimport --db shops --collection shop --file data.json --jsonArray
