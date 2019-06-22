let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Category = require('../../../moduls/post/category'),
    Product = require('../../../moduls/post/product'),
    Customer = require('../../../moduls/user/customer');

router.get('/', function (req, res) {
    Category.findOne({name: 'root'}).populate('allInOne').exec(function (err, root) {
        if(!err) {
            res.render('user/adminDashboard', {categories: root.allInOne});
        }
    })
});

module.exports = router;
