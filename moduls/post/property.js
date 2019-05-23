var mongoose = require('mongoose');

var propertySchema = mongoose.Schema({
    key: String,
    unit: String,
    value: String
});

module.exports = mongoose.model("Property", propertySchema);