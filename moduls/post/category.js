var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: String,
    subCategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
    thumbnail: [String]
});

module.exports = mongoose.model("Category", categorySchema);