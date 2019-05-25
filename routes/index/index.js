let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product');

router.get('/', function (req, res) {
    Category.findOne({ name: 'root' }, function (err, root) {
        root.getChildrenTree({fields: 'name'}, function(err, cats) {
            res.render('index', {cats: cats});
        });
    });
});

module.exports = router;
