let mongoose = require('mongoose');

let adminSchema = mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model("Admin", adminSchema);