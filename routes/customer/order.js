let express = require('express'),
    router = express.Router(),
    uuid = require('uuid/v1');
    Order = require('../../moduls/user/order'),
    Customer = require('../../moduls/user/customer');

    router.get('/', function(req, res) {
        //fetching user's cart from database
        if (!req.user) {
            res.redirect('/');
        } else {
            Customer.findById(req.user._id)
            .populate('cart.productId')
            .exec(function(err, customer) {
                // calculating totalPriceAtDate
                var totalPriceAtDate = 0;
                for (item of customer.cart) {
                    totalPriceAtDate += item.productId.price * item.quantity;
                }
                res.render('user/order', {cart: customer.cart, totalPriceAtDate: totalPriceAtDate});
            });
        }
    });

    router.post('/', function(req, res) {
        Customer.findById(req.user._id, function(err, customer) {
            order = new Order({
                orderNumber: Date.now(),
                address: req.body.address,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                nationalId: req.body.nationalId,
                homeNumber: req.body.homeNumber,
                phoneNumber: req.body.phoneNumber,
                customer: req.user._id,
                products: customer.cart,
                trackingCode: uuid(),
                shippingMethod: req.body.shippingMethod,
                paymentMethod: req.body.paymentMethod,
                status: 'awaitsPayment'
            });
            
            // saving
            order.save(function (err, savedOrder) {
                if(!err) {
                    // emptying customer's cart + adding order to user's orders
                    customer.orders.push(savedOrder);
                    customer.cart = [];
                    customer.save().then(() => {
                        res.redirect('/userDashboard');
                    }).catch((err) => {
                        throw err;
                    });
                } else {
                    throw err;
                }
            });
        });
    });

    router.delete('/', function(req, res) {
        Order.findOneAndRemove({_id: req.body.orderId}, function(err) {
            // redirecting
            if (req.user.isAdmin) {
                res.redirect('/adminDashboard');                            
            } else {
                res.redirect('/userDashboard');
            }
        });
    });

module.exports = router;
