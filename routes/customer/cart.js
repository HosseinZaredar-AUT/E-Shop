let express = require('express'),
    router = express.Router(),
    Customer = require('../../moduls/user/customer'),
    Product = require('../../moduls/post/product');

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
                res.render('user/cart', {cart: customer.cart, totalPriceAtDate: totalPriceAtDate});
            });
        }
    });

    router.post('/add', function(req, res) {
        if(req.user) {
            if(!req.user.isAdmin) {
                productId = req.body.productId;
                Customer.findById(req.user._id, function (err, customer) {
                    if (!customer) {
                        res.send('didnt find user');
                    }
                    customer.cart.push({productId: productId, quantity: 1});
                    // adding price to totalPrice of cart
                    Product.findById(productId, function (err) {
                        // saving
                        if (!err) {
                            customer.save().then(() => {
                                res.send('done')
                            }).catch((err) => {
                                throw err;
                            });
                        }
                    });
                });
            } else {
                res.send('admin');
            }
        } else {
            res.send('login');
        }
    });

    // route for editing product quantity from cart
    router.put('/', function(req, res) {
        productId = req.body.productId;
        newQuantity = req.body.newQuantity;
        Customer.findById(req.user._id, function(err, customer) {
            var item = customer.cart.find(product => product.productId == productId);
            item.quantity = newQuantity;
            // saving
            customer.save(function(err, updatedCustomer) {
                // populating cart
                updatedCustomer.populate('cart.productId', function(err, populatedCustomer) {
                    // calculating new totalPriceAtDate
                    var totalPriceAtDate = 0;
                    for (item of updatedCustomer.cart) {
                        totalPriceAtDate += item.productId.price * item.quantity;
                    }
                    // sending to front
                    res.json({
                        totalPriceAtDate: totalPriceAtDate
                    });
                });
                
            });
        });
    });

    router.delete('/', function(req, res) {
        productId = req.body.productId;
        Customer.findById(req.user._id, function(err, customer) {
            var index = customer.cart.indexOf(product => product.productId == productId);
            customer.cart.splice(index, 1);
            customer.save(function(err, updatedCustomer) {
                // redirecting
                res.json({
                    done: 'done'
                });
            });
        });
    });

module.exports = router;
