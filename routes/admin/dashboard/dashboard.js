let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Order = require('../../../moduls/user/order'),
    Admin = require('../../../moduls/user/admin');
    usefulFunctions   = require('../../../middlewares/usefulFunctions');


router.get('/', function (req, res) {
    Order.find({})
        .populate('products.productId')
        .populate('address')
        .exec(function(err, orders) {
            Admin.findOne({_id: req.user._id}).exec((err, foundAdmin) => {
                if(!err) {
                    let todaySales = [];
                    let thisMonthSales = [];
                    orders.forEach(function (order) {
                        if(usefulFunctions.isToday(order.orderNumber))
                            todaySales.push(order);
                        if(usefulFunctions.isThisMonth(order.orderNumber))
                            thisMonthSales.push(order)
                    });
                    res.render('user/adminDashboard', {
                        orders: orders,
                        todaySales: todaySales,
                        thisMonthSales: thisMonthSales,
                        adminName: foundAdmin.username})
                }
            })
        });
});

module.exports = router;

