let mongoose = require('mongoose');

let propertySchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Property", propertySchema);