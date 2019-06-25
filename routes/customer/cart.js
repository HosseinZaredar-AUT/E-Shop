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
        productId = req.body.productId;
        if (!req.user) {
            res.redirect('/');
        } else {
            Customer.findById(req.user._id, function(err, customer) {
                if (!customer)
                    redirect('/');
                customer.cart.push({productId: productId, quantity: 1}); //TODO handle the case that product is already in cart
                // adding price to totalPrice of cart
                Product.findById(productId, function(err, product) {
                    customer.cartTotalPrice += product.price;
                    // saving
                    customer.save().then(() => {
                        res.redirect('/cart');
                    }).catch((err) => {
                        throw err;
                    });
                });
            }); 
        }
    });

module.exports = router;
