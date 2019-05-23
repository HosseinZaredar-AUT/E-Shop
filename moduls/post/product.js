var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    description: String,
    isAvailable: Boolean,
    price: Number,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
    images: [String]
});

module.exports = mongoose.model("Product", productSchema);