let express = require('express'),
    router = express.Router(),
    Customer = require('../moduls/user/customer');

    router.post('/new', (req, res) => {
        if(req.user) {
            if(!req.user.isAdmin) {
                Customer.findOne({_id: req.user._id}, (err, foundCustomer) => {
                    if (!err) {
                        let tmp = true;
                        foundCustomer.favorites.forEach(function (fav) {
                            if (fav.toString() === req.body.productId.toString()) {
                                tmp = false;
                            }
                        });
                        if (tmp) foundCustomer.favorites.push(req.body.productId);
                        foundCustomer.save((err) => {
                            if (!err) {
                                res.send('done');
                            }
                        })
                    } else {
                        console.log(err);
                    }
                });
            } else {
                res.send('admin');
            }
        } else {
            res.send('login');
        }
    });

    router.put('/edit', (req, res)=> {
        Customer.findOne({_id: req.user._id}, (err, foundCustomer) => {
            if(!err) {
                console.log(req.body.favorites);
                foundCustomer.favorites = req.body.favorites;
                foundCustomer.save((err, savedCustomer) => {
                    if(!err) {
                        res.redirect('back');
                    }
                })
            } else {
                res.redirect('back');
            }
        });
    });

module.exports = router;