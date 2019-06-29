let mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
    orderNumber: {
        type: Date,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    nationalId: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    products: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true}
    }],
    address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
    trackingCode: String,
    paymentMethod: String,
    shippingMethod: String,
    status: {
        type: String,
        enum: ['awaitsPayment', 'awaitsDelivery', 'delivered']
    }
});

module.exports = mongoose.model("Order", orderSchema);