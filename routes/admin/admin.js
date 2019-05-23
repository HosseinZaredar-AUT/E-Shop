let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Customer = require('../../moduls/user/customer');

router.get('/', function (req, res) {
    console.log('admin route accessed!');
});

router.get('/add-product', function(req, res) {
    res.sendFile(path.join(__dirname, '../../src/add-product.html'));
});

router.post('/add-product', function(req, res) {
    Product.create({
        name: req.body.name,
        description: req.body.description,
        remainingNumber: parseInt(req.body.remainingNumber),
        price: parseInt(req.body.price)
    }, function(err, product) {
        if (err)
            console.log('error in adding product to database');
        else {
            console.log('Product with information below added to database:');
            console.log(product);
        }
    });
});

module.exports = router;
