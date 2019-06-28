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

    router.post('/add', async function(req, res) {

        if(req.user) {
            if(!req.user.isAdmin) {

                customer = await Customer.findById(req.user._id);
                productId = req.body.productId;
                if (!customer) {
                    res.send('didnt find user');
                }

                // checking if the product is already in cart
                var prod = customer.cart.find(item => item.productId == productId)
                if (prod) { // if it is
                    prod.quantity += 1;
                } else { // if it isn't
                    customer.cart.push({productId: productId, quantity: 1});
                }

                // saving
                await customer.save();
                res.send('done');

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

    router.delete('/', async function(req, res) {
        productId = req.body.productId;
        customer = await Customer.findById(req.user._id);
        for (var i = 0; i < customer.cart.length; i++) {
            if (customer.cart[i].productId == productId) {
                customer.cart.splice(i, 1);
                await customer.save();
                res.redirect('/cart');
            }
        }
    });

module.exports = router;
