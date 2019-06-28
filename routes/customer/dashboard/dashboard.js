let express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    Customer = require('../../../moduls/user/customer'),
    Address = require('../../../moduls/user/address'),
    Order   = require('../../../moduls/user/order');

router.get('/', (req, res) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        Order.find({customer: req.user._id})
        .populate('products.productId')
        .populate('address')
        .exec(function(err, orders) {
            Customer.findOne({_id: req.user._id}).populate('favorites').populate('addresses').exec((err, foundCustomer) => {
                if(!err) {
                    res.render('user/userDashboard', {orders: orders, customer: foundCustomer});
                }
            })
        });
    }
});

router.delete('/order/:id', function (req, res) {
    Order.findOneAndDelete({_id: req.params.id}, function (err) {
        if(!err) {
            res.redirect('back');
        } else {
            // failed to delete
            res.redirect('back');
        }
    })
});

router.put('/info', (req, res) => {
    let details = req.body;
    if(details.firstname && details.lastname && details.email && details.phone && details.idNumber) {
        Customer.findOneAndUpdate({_id: req.user._id}, {
            firstname: details.firstname,
            lastname : details.lastname,
            email    : details.email,
            phone    : details.phone,
            idNumber : details.idNumber
        }, function (err) {
            if(!err) {
                res.redirect('back');
            } else {
                res.redirect('back');
            }
        })
    } else {
        res.redirect('back');
    }
});

router.put('/password', async (req, res) => {
    let details = req.body;
    if (details.oldPassword && details.newPassword) {
        customer = await Customer.findById(req.user._id);
        // checking oldPassword
        isEqual = await bcrypt.compare(details.oldPassword, customer.password);
        if (isEqual) {
            // hashing newPassword
            var salt = await bcrypt.genSalt(10)
            var hashedPassword = await bcrypt.hash(details.newPassword, salt)
            customer.password = hashedPassword;
            await customer.save();
            res.redirect('/userDashboard');   
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

router.post('/address', (req, res) => {
    let details = req.body;
    if(details.province && details.city && details.postalCode
        && details.homePhone && details.address) {
        new Address({
            province   : details.province,
            city       : details.city,
            postalCode : details.postalCode,
            homePhone  : details.homePhone,
            address    : details.address
        }).save(function (err, savedAddress) {
            if(!err) {
                Customer.findOne({_id: req.user._id}, (err, foundUser) => {
                    foundUser.addresses.push(savedAddress._id);
                    foundUser.save((err)=>{
                        if(!err) {
                            res.redirect('back')
                        }
                    })
                })
            } else {
                res.redirect('back')
            }
        })
    } else {
        res.redirect('back');
    }
});

router.put('/fav/edit', (req, res)=> {
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

router.put('/address/:id', (req, res) => {
    let details = req.body;
    console.log(req.body);
    if(details.province && details.city && details.postalCode
        && details.homePhone && details.address) {
        Address.findOneAndUpdate({_id: req.params.id}, {
            province   : details.province,
            city       : details.city,
            postalCode : details.postalCode,
            homePhone  : details.homePhone,
            address    : details.address
        }, function (err, updatedAddress) {
            if(!err) {
                res.redirect('back')
            } else {
                res.redirect('back')
            }
        })
    } else {
        res.redirect('back');
    }
});

router.delete('/address/:id', (req, res) => {
    Address.findOneAndDelete({_id: req.params.id}, function (err) {
        if(!err) {
            res.redirect('back')
        } else {
            res.redirect('back')
        }
    })
});

module.exports = router;
