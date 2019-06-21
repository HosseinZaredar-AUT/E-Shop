let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Category = require('../../../moduls/post/category'),
    Product = require('../../../moduls/post/product'),
    Customer = require('../../../moduls/user/customer');

router.get('/', function (req, res) {
    res.render('user/adminDashboard');
});

module.exports = router;
