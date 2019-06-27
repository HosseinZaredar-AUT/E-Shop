let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Order = require('../../../moduls/user/order');

router.get('/', function (req, res) {
    Order.find({})
        .populate('products.productId')
        .exec(function(err, orders) {
            res.render('user/adminDashboard', {orders: orders});
        });
});

module.exports = router;

