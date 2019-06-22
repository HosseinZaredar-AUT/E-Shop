let mongoose = require('mongoose'),
    mdt = require('mongoose-data-tree');

let categorySchema = mongoose.Schema({
    name: String,
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    allInOne: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
});

categorySchema.plugin(mdt);

module.exports = mongoose.model("Category", categorySchema);