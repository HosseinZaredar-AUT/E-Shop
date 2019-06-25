let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Customer = require('../moduls/user/customer'),
    Admin    = require('../moduls/user/admin');

router.get('/', (req, res) => {
    res.render('index/login');
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/userDashboard',
        failureRedirect: '/login',
    })(req, res, next);
});

module.exports = router;
