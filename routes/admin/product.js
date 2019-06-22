let express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    filepond = require('filepond'),
    uuid = require('uuid/v1'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Property = require('../../moduls/post/property');


router.get('/', function (req,res) {
    res.render('product/product');
});

router.post('/', function (req, res) {
    // let properties = req.body.property;
    // let propertiesArray = [];
    // for(let i=0;i<properties.length-1;i++) {
    //     propertiesArray.push(new Property({
    //         key: properties[i],
    //         value: properties[++i]
    //     }));
    // }
    // Category.findOne({name: req.body.category}, function (err, foundCategory) {
        // if(!err) {
            let product = new Product({
                // name: req.body.name,
                // description: req.body.description,
                // remainingNumber: req.body.remainingNumber,
                // price: req.body.price,
                // hasDiscount: req.body.hasDiscount,
                // category: foundCategory._id,
                // properties: propertiesArray,
                images: []
            });

            // saving images and removing them from temp_images
            if (!fs.existsSync('./public/Images/products'))
                fs.mkdirSync('./public/Images/product');
            fs.mkdirSync('public/Images/products/' + product._id);

            // if it is a single images
            if (typeof(req.body.filepond) == 'string') {
                image = req.body.filepond;
                fs.renameSync('./temp_images/' + image, './public/Images/products/' + product._id + '/' + image);
                // product.images.push('Images/products/' + product._id + '/' + image);
                rimraf.sync('./temp_images/');
            } else { // if it is an array of images
                for (image of req.body.filepond) {
                    fs.renameSync('./temp_images/' + image, './public/Images/products/' + product._id + '/' + image);
                    // product.images.push('Images/products/' + product._id + '/' + image);
                }
                rimraf.sync('./temp_images/');
            }
            
            product.save(function (err, savedProduct) {
                if(!err) {
                    console.log(savedProduct);
                    res.redirect('/');
                } else {
                    console.log(err);
                }
            })
        // }
    // })
});

router.put('/:id', function (req, res) {
    // let properties = req.body.property;
    // let propertiesArray = [];
    // for(let i=0;i<properties.length-1;i++) {
    //     propertiesArray.push(new Property({
    //         key: properties[i],
    //         value: properties[++i]
    //     }));
    // }
    // Category.findOne({name: req.body.category}, function (err, foundCategory) {
    //     if(!err) {
    //         let newProduct = {
    //             name: req.body.name,
    //             description: req.body.description,
    //             remainingNumber: req.body.remainingNumber,
    //             price: req.body.price,
    //             hasDiscount: req.body.hasDiscount,
    //             category: foundCategory._id,
    //             properties: propertiesArray,
    //             images: []
    //         };

            // saving images and removing them from temp_images            
            // if it is a single images
            if (typeof(req.body.filepond) == 'string') {
                image = req.body.filepond;
                fs.renameSync('./temp_images/' + image, './public/Images/products/' + product._id + '/' + image);
                product.images.push('Images/products/' + product._id + '/' + image);
                rimraf.sync('./temp_images/');
            } else { // if it is an array of images
                for (image of req.body.filepond) {
                    fs.renameSync('./temp_images/' + image, './public/Images/products/' + product._id + '/' + image);
                    product.images.push('Images/products/' + product._id + '/' + image);
                }
                rimraf.sync('./temp_images/');
            }

    //         Product.findOneAndUpdate({_id: req.params.id},
    //             newProduct,
    //             function (err, product) {
    //                 if(!err) {
                        // deleting old images
                        for (image of product.images) {
                            fs.unlinkSync('./public/' + image);
                        }
                        res.redirect('/');
    //                     res.redirect('/');
    //                 }
    //             })
    //     }
    // })
});

// to upload a file as it is dragged into filepond
router.post('/upload', function(req, res) {
    var name = uuid();
    var fullType = req.files.filepond.mimetype;
    var type = fullType.substring(fullType.indexOf('/') + 1);

    // creating temp_images directory if it doesn't exist
    var dir = './temp_images';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    // saving the image in temp_images
    req.files.filepond.mv('./temp_images/' + name + '.' + type).then(function(err) {
        if (err)
            throw err;
        res.send(name + '.' + type);
    });
});

// to revert file upload
router.delete('/revert', function(req, res) {
    fs.unlink('./temp_images/' + req.body.path, function(err) {
        if (err)
            console.log(err);
    });
});

router.delete('/:id', function (req, res) {
    Product.findOneAndDelete({id: req.params.id}, function (err) {
        if(!err) {
            rimraf('./public/Images/products/' + id, function() {
                res.redirect('/');
            });
        }
    })
});


module.exports = router;