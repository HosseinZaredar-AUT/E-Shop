let express = require('express'),
    router = express.Router(),
    app = express(),
    path = require('path'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Property = require('../../moduls/post/property'),
    usefulFunctions = require('../../middlewares/usefulFunctions');

router.get('/', async function (req, res) {
    try {
        let root = await Category.findOne({name: 'root'});
        let newProducts = await Product.find({}).limit(10).sort({_id: -1});
        let discountProducts = await Product.find({discount: {$gt: 0}});
        let popularProducts = await Product.find({remainingNumber: {$lt: 10}});
        let bestSellerProducts = await Product.find({boughtNumber: {$gt: 100}});
        root.getChildrenTree(function (err, childs) {
            if (!err) {
                let cats = usefulFunctions.getDataArray(childs);
                res.render('index', {
                    cats: cats,
                    newProducts: newProducts,
                    discountProducts: discountProducts,
                    popularProducts: popularProducts,
                    bestSellerProducts: bestSellerProducts
                });
            }
        });
    } catch (e) {
        console.log(e);
    }
});

router.post('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
