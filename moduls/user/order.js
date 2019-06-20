var mongoose = require("mongoose");
var persianDate = require("persian-date")

var orderSchema = mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
    submittedDate: persianDate,
    totalPriceAtDate: Number
});

module.exports = mongoose.model("Order", orderSchema);