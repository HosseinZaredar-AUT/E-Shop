let mongoose = require('mongoose');

let customerSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    idNumber: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    addresses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Address'}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});
module.exports = mongoose.model("Customer", customerSchema);