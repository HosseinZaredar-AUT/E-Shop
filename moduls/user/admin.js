var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    username: String,
    password: String,
    email:    String
});
module.exports = mongoose.model("Admin", adminSchema);