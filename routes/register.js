let express = require('express'),
    router = express.Router(),
    Customer = require('../moduls/user/customer');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
     let details = req.body;
     if((('agreeToTerms') in details) === true) {
         if(details.agreeToTerms === 'on') {
             if(details.username && details.password &&
                details.email && details.phone) {
                 new Customer({
                     username: details.username,
                     password: details.password,
                     email: details.email,
                     phone: details.phone
                 }).save(function (err, savedCustomer) {
                     if(!err) {
                         req.session.user = savedCustomer;
                         res.redirect('/userDashboard');
                     }
                 })
             } else {
                 res.redirect('/');
             }
         } else {
             res.redirect('/');
         }
     } else {
         res.redirect('/');
     }
});

module.exports = router;
