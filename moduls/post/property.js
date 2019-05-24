var mongoose = require('mongoose');

var propertySchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Property", propertySchema);