var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    username: String,
    password: String,
    email:    String,
    phone:    String,
    idNumber: String,
    addresses:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Address'}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    image: String
});
module.exports = mongoose.model("Customer", customerSchema);