var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    body: String,
    rate: Number
});
module.exports = mongoose.model("Comment", commentSchema);