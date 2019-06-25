let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    productID: {
        type: String
    },
    creationDate: Date,
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'soon'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    remainingNumber: {
        type: Number,
        required: true
    },
    boughtNumber: {
        type: Number
    },
    colors: [{
        type: String
    }],
    images: [{
        type: String
    }],
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    discount: {
        type: Number 
    },
    description: {
        type: String,
        required: true
    },
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    
});

module.exports = mongoose.model("Product", productSchema);