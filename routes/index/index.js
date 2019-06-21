let express = require('express'),
    router = express.Router(),
    app = express(),
    path = require('path'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Property = require('../../moduls/post/property');

router.get('/', function (req, res) {
    res.render('index')
});

router.post('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
