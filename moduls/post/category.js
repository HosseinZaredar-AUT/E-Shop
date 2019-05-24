var mongoose = require('mongoose'),
    mdt = require('mongoose-data-tree');

var categorySchema = mongoose.Schema({
<<<<<<< HEAD
    name: String,
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
=======
    name: {
        type: String,
        required: true
    },
    subCategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
    thumbnail: [String]
>>>>>>> 62c8e3527da44feb19546f2d8c3f4af5ad8954b0
});

categorySchema.plugin(mdt);

module.exports = mongoose.model("Category", categorySchema);