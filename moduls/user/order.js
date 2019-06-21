let mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    totalPriceAtDate: Number,
    status: Number
});

module.exports = mongoose.model("Order", orderSchema);