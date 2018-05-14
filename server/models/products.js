'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productspData = new Schema({
    name: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        default : "/assests/images/offer.png",
    },
    img: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default:"/assests/images/tag.png"
    },
    calo: {
        type: String,
        required: true
    },
    checked: {
        type: String
    },
    note: {
        type: String
    },
    amount:{
        type:String,
        default: 1
    },
    groupId:{
        type:Number,
        default: 1
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var products = module.exports = mongoose.model('products', productspData);

module.exports.getProduct = (callback, limit) => {
    products.find(callback).limit(limit);
}

module.exports.getProductById = (id, callback) => {
    products.findById(id, callback);
}

module.exports.addProduct = (product, callback) => {
    products.create(product, callback);
}

module.exports.updateProduct = (id, product, callback) => {
    var query = {
        _id: id
    };
    var update = {
        name: product.name,
        offer: product.offer,
        img: product.img,
        tag: product.tag,
        calo: product.calo,
        note: product.note,
        groupId:product.groupId
    }
    products.update(query,{$set: update}, callback);
}
module.exports.removeProduct = (id, callback) => {
    var query = {
        _id: id
    };
    products.remove(query, callback);
}
//elder:2
//oldel :3
//gain 4
//loss:5
//mongoimport --db shops --collection shop --file data.json --jsonArray
