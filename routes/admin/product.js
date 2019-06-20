let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Property = require('../../moduls/post/property');

router.get('/', function (req,res) {
    res.render('admin');
});

router.post('/', function (req, res) {
    let properties = req.body.property;
    let propertiesArray = [];
    for(let i=0;i<properties.length-1;i++) {
        propertiesArray.push(new Property({
            key: properties[i],
            value: properties[++i]
        }));
    }
    Category.findOne({name: req.body.category}, function (err, foundCategory) {
        if(!err) {
            let product = new Product({
                name: req.body.name,
                description: req.body.description,
                remainingNumber: req.body.remainingNumber,
                price: req.body.price,
                hasDiscount: req.body.hasDiscount,
                category: foundCategory._id,
                properties: propertiesArray,
            });
            // TODO file still need to be handled
            product.save(function (err, savedProduct) {
                if(!err) {
                    console.log(savedProduct);
                    res.redirect('/');
                } else {
                    console.log(err);
                }
            })
        }
    })
});

router.put('/:id', function (req, res) {
    let properties = req.body.property;
    let propertiesArray = [];
    for(let i=0;i<properties.length-1;i++) {
        propertiesArray.push(new Property({
            key: properties[i],
            value: properties[++i]
        }));
    }
    Category.findOne({name: req.body.category}, function (err, foundCategory) {
        if(!err) {
            let newProduct = {
                name: req.body.name,
                description: req.body.description,
                remainingNumber: req.body.remainingNumber,
                price: req.body.price,
                hasDiscount: req.body.hasDiscount,
                category: foundCategory._id,
                properties: propertiesArray,
            };
            // TODO added or deleted pics must be considered
            Product.findOneAndUpdate({_id: req.params.id},
                newProduct,
                function (err) {
                    if(!err) {
                        res.redirect('/');
                    }
                })
        }
    })
});

router.delete('/:id', function (req, res) {
    Product.findOneAndDelete({id: req.params.id}, function (err) {
        if(!err) {
            // TODO product photos must be deleted
            res.redirect('/');
        }
    })
});

module.exports = router;