let express = require('express'),
    router = express.Router(),
    Customer = require('../../moduls/user/customer');

    router.get('/', function(req, res) {
        //fetching user's cart from database
        if (!req.user) {
            res.redirect('/');
        } else {
            Customer.findById(req.user._id)
            .populate('cart.productId')
            .exec(function(err, customer) {
                res.render('user/cart', {cart: customer.cart});
            });
        }
    });

    router.post('/add', function(req, res) {
        productId = req.body.productId;
        if (!req.user) {
            res.redirect('/');
        } else {
            Customer.findById(req.user._id, function(err, customer) {
                if (!customer)
                    redirect('/');
                console.log(productId);
                customer.cart.push({productId: productId, quantity: 1}); //TODO handle the case that product is already in cart
                console.log(customer);
                customer.save().then(() => {
                    res.redirect('/cart');
                }).catch((err) => {
                    throw err;
                });
            }); 
        }
    });

module.exports = router;
