let mongoose = require('mongoose'),
    mdt = require('mongoose-data-tree');

let categorySchema = mongoose.Schema({
    name: String,
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

categorySchema.plugin(mdt);

module.exports = mongoose.model("Category", categorySchema);