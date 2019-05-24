var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:    {
        type: String,
        required: true
    },
    phone:    {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    },
    addresses:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Address'}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    image: {
        type: String,
        required: false
    },
});
module.exports = mongoose.model("Customer", customerSchema);