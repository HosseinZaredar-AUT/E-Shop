let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Customer = require('../../moduls/user/customer');

router.get('/', function (req, res) {
    console.log('admin route accessed!');
});

router.get('/add-product', function (req, res) {
    res.sendFile(path.join(__dirname, '../../src/add-product.html'));
});

router.post('/add-product', function (req, res) {
    Product.create({
        name: req.body.name,
        description: req.body.description,
        remainingNumber: parseInt(req.body.remainingNumber),
        price: parseInt(req.body.price)
    }, function (err, product) {
        if (err)
            console.log('error in adding product to database');
        else {
            console.log('Product with information below added to database:');
            console.log(product);
        }
    });
});


router.get('/add-category', function (req, res) {
    Category.findOne({ name: 'root' }, function (err, root) {
        root.getChildren(null, 'name', null, true, function(err, cats) {
            res.render('add-category', {cats, cats});
        });
    });
});

router.post('/add-category', function (req, res) {
    if (req.body.parentCategory == 'root') {
        //adding category at the root
        Category.findOne({ name: 'root' }, function (err, root) {
            if (root == null) {
                Category.create({
                    name: 'root'
                }, function (err, r) {
                    var cat = new Category({
                        name: req.body.name,
                        parent: r
                    });
                    cat.save(); 
                });
            } else {
                var cat = new Category({
                    name: req.body.name,
                    parent: root
                });
                cat.save(); 
            }
        });
    } else {
        //adding subcategory
        Category.findOne({ name: req.body.parentCategory }, function (err, parent) {
            var cat = new Category({
                name: req.body.name,
                parent: parent
            });
            cat.save(); 
        });
    }
    res.redirect('/admin/add-category');
});

// router.get('/categories', function (req, res) {
//     // fetch categories form database
//     cats = [];
//     Category.findOne({ name: 'root' }, function (err, root) {
//         getChildren(root, 1);
//         // .then(function() {
//         //     // console.log(cats);
//         //     res.render('categories', {cats: cats});
//         // });;
//     });

// });

module.exports = router;
