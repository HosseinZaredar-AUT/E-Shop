var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
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
    price: {
        type: String,
        required: true
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
    images: [{
        type: String,
        required: true
    },]
});

module.exports = mongoose.model("Product", productSchema);