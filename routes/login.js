let express = require('express'),
    router = express.Router(),
    Customer = require('../moduls/user/customer');

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
                // no such email
                res.redirect('back')
            }
        })
    } else {
        // empty body
        res.redirect('back');
    }
});

module.exports = router;
