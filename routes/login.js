let express = require('express'),
    router = express.Router(),
    Customer = require('../moduls/user/customer'),
    Admin    = require('../moduls/user/admin');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    let details = req.body;
    if(details.email && details.password) {
        Customer.findOne({email: details.email}, function (err, foundCustomer) {
            if(!err && foundCustomer !== null) {
                if(foundCustomer.password === details.password) {
                    req.session.user = foundCustomer;
                    res.redirect('userDashboard');
                } else {
                    // wrong pass
                    res.redirect('back')
                }
            } else {
                Admin.findOne({email: details.email}, function (err, foundAdmin) {
                    if(!err && foundAdmin !== null) {
                        if(foundAdmin.password === details.password) {
                            req.session.user = foundAdmin;
                            res.redirect('adminDashboard');
                        } else {
                            // wrong pass
                            res.redirect('back')
                        }
                    } else {
                        // email matches to nothing
                        res.redirect('back')
                    }
                })
            }
        })
    } else {
        // empty body
        res.redirect('back');
    }
});

module.exports = router;
