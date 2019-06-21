let express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    filepond = require('filepond'),
    uuid = require('uuid/v1'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Property = require('../../moduls/post/property');


router.get('/', function (req,res) {
    res.render('product/product');
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

// to upload a file as it is dragged into filepond
router.post('/upload', function(req, res) {
    var name = uuid();
    var fullType = req.files.filepond.mimetype;
    var type = fullType.substring(fullType.indexOf('/') + 1);
    req.files.filepond.mv('./public/images/' + name + '.' + type).then(function(err) {
        if (err)
            throw err;
        var path = 'images/' + name + '.' + type;
        res.send(path);
    });
});

// to revert file upload
// should use a delete method but it didn't work, I don't know why
router.post('/revert', function(req, res) {
    fs.unlink('./public/' + req.body.path, function(err) {
        if (err)
            console.log(err);
    });
});


module.exports = router;