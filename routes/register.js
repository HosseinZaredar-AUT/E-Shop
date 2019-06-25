let express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    Customer = require('../moduls/user/customer');

router.get('/', (req, res) => {
    res.render('index/register');
});

router.post('/', (req, res) => {
    let details = req.body;
    if((('agreeToTerms') in details) === true) {
        if(details.agreeToTerms === 'on') {
            if(details.username && details.password &&
               details.email && details.phone) {
                // checking if emial doesn't already exist
                Customer.findOne({email: details.email}, function(err, foundCustomer) {
                    if (foundCustomer) {
                        res.redirect('/register');
                    } else {
                        //hashing password
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(details.password, salt, function(err, hashedPassword) {
                                //creating a customer and saving in database
                                new Customer({
                                    username: details.username,
                                    password: hashedPassword,
                                    email: details.email,
                                    phone: details.phone,
                                    cartTotalPrice: 0
                                }).save(function (err, savedCustomer) {
                                    if(!err) {
                                       res.redirect('/login');
                                    } else {
                                        throw err;
                                    }
                                });
                            });
                        });
                    }
                });
            } else {
                res.redirect('/register');
            }
        } else {
            res.redirect('/register');
        }
    } else {
        res.redirect('/register');
    }
});

module.exports = router;
