var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    province: String,
    city: String,
    postalCode:  String,
    homePhone:    String,
    mobilePhone: String,
    address: String
});
module.exports = mongoose.model("Address", addressSchema);