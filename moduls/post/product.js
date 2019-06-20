let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    remainingNumber: {
        type: String,
        required: true
    },
    boughtNumber: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    hasDiscount: {
        type: String
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
    images: [{
        type: String
    }]
});

module.exports = mongoose.model("Product", productSchema);