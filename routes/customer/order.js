let express = require('express'),
    router = express.Router(),
    uuid = require('uuid/v1');
    Order = require('../../moduls/user/order');

    router.get('/', function(req, res) {
        res.render('user/order');
    });

    router.post('/', function(req, res) {
        order = new Order({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nationalId: req.body.nationalId,
            homeNumber: req.body.homeNumber,
            phoneNumber: req.body.phoneNumber,
            //TODO get customer id form session
            //TODO get products from user's cart in database
            trackingCode: uuid(),
            //TODO calculate totalPriceAtDate from products
            shippingMethod: req.body.shippingMethod,
            paymentMethod: req.body.paymentMethod,
            status: 'awaitsPayment'
        });
        
        order.save(function (err, savedOrder) {
            if(!err) {
                console.log(savedOrder);
                res.redirect('/'); //TODO should redirect to payment page
            } else {
                console.log(err);
            }
        })

    });

module.exports = router;
