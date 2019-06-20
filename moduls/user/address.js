let mongoose = require('mongoose');

let addressSchema = mongoose.Schema({
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    homePhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model("Address", addressSchema);