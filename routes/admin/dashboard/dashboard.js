let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Order = require('../../../moduls/user/order'),
    Admin = require('../../../moduls/user/admin');

router.get('/', function (req, res) {
    Order.find({})
        .populate('products.productId')
        .populate('address')
        .exec(function(err, orders) {
            Admin.findOne({_id: req.user._id}).exec((err, foundAdmin) => {
                if(!err) {
                    res.render('user/adminDashboard', {orders: orders, adminName: foundAdmin.username});
                }
            })
            // res.render('user/adminDashboard', {orders: orders});
        });
});

module.exports = router;

