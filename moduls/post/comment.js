const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    customer: Object,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    body: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: false
    },
});
module.exports = mongoose.model("Comment", commentSchema);