let express = require('express'),
    router = express.Router(),
    app = express(),
    path = require('path'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Property = require('../../moduls/post/property');

router.get('/', function (req, res) {
    Category.findOne({name: 'root'}).populate('allInOne').exec(function (err, root) {
        if(!err) {
            res.render('index', {categories: root.allInOne});
        }
    })
});

router.post('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
