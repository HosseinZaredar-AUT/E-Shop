let express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    middlewares = require('../../middlewares/index'),
    commentRouter = require('./comment'),
    fileRouter = require('./file'),
    favRouter = require('../fav');
    

// favorite router
router.use('/:productId/fav', (req, res, next) => {
    req.body.productId = req.params.productId;
    next();
}, middlewares.isAuthenticatedUser, favRouter);

// file router
router.use('/file', middlewares.isAuthenticatedAdmin, fileRouter);

// comment router
router.use('/:productId/comment', (req, res, next) => {
    req.body.productId = req.params.productId;
    next();
}, commentRouter);

router.get('/:productId', async (req, res) => {
    try {
        const prodId = req.params.productId;
        const product = await Product.findById(prodId).populate('comments').exec();
        const recommends = await Product.find({category: product.category});

        res.render('product/product', {
            product: product,
            recommends: recommends
        });
    } catch (e) {

    }
});

router.post('/', middlewares.isAuthenticatedAdmin, function (req, res) {
    let properties = req.body.property;
    let propertiesArray = [];
    for (let i = 0; i < properties.length - 1; i++) {
        propertiesArray.push({
            key: properties[i],
            value: properties[++i]
        });
    }
    if (typeof (req.body.colors) == 'string')
        req.body.colors = [req.body.colors];

    Category.findOne({name: req.body.category}, function (err, foundCategory) {
        if(!err) {
            let product = new Product({
                productID: req.body.productID,
                creationDate: Date.now(),
                name: req.body.name,
                status: req.body.status,
                price: req.body.price,
                remainingNumber: req.body.remainingNumber,
                boughtNumber: 0,
                colors: req.body.colors,
                images: [],
                category: foundCategory._id,
                discount: req.body.discount,
                description: req.body.description,
                properties: propertiesArray
            });

            // saving images and removing them from temp_images
            if (!fs.existsSync('./public/Images/products'))
                fs.mkdirSync('./public/Images/products');
            fs.mkdirSync('public/Images/products/' + product._id);

            // if it is a single images
            if (typeof (req.body.filepond) == 'string') {
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

            // saving the product
            product.save(function (err, savedProduct) {
                if (!err) {
                    // adding the product to category's list
                    foundCategory.products.push(savedProduct._id);
                    foundCategory.save().then(() => {
                        res.redirect('/product/' + savedProduct._id);
                    }).catch((err) => {
                        throw err;
                    })
                } else {
                    console.log(err);
                }
            });
        }
    });
});

router.put('/:id', middlewares.isAuthenticatedAdmin, function (req, res) {
    let properties = req.body.property;
    let propertiesArray = [];
    if (properties) {
        for (let i = 0; i < properties.length - 1; i++) {
            propertiesArray.push({
                key: properties[i],
                value: properties[++i]
            });
        }
    }
    console.log(req.body.colors);
    if (typeof (req.body.colors) == 'string')
        req.body.colors = [req.body.colors];

    Category.findOne({name: req.body.category}, function (err, foundCategory) {
        if(!err) {
            let newProduct = {
                productID: req.body.productID,
                name: req.body.name,
                status: req.body.status,
                price: req.body.price,
                remainingNumber: req.body.remainingNumber,
                colors: req.body.colors,
                images: [],
                category: foundCategory._id,
                discount: req.body.discount,
                description: req.body.description,
                properties: propertiesArray
            };
        
            // deleting old images
            Product.findById(req.params.id, function(err, product) {
                for (image of product.images) {
                    fs.unlinkSync('./public/' + image);
                }
            
                // saving images and removing them from temp_images
                // if it is a single image
                if (typeof (req.body.filepond) === 'string') {
                    image = req.body.filepond;
                    fs.renameSync('./temp_images/' + image, './public/Images/products/' + product._id + '/' + image);
                    newProduct.images.push('Images/products/' + product._id + '/' + image);
                    rimraf.sync('./temp_images/');
                } else { // if it is an array of images
                    for (image of req.body.filepond) {
                        fs.renameSync('./temp_images/' + image, './public/Images/products/' + product._id + '/' + image);
                        newProduct.images.push('Images/products/' + product._id + '/' + image);
                    }
                    rimraf.sync('./temp_images/');
                }
            
                // saving
                Product.findOneAndUpdate({_id: req.params.id},
                    newProduct,
                    function (err, product) {
                        if (!err) {
                            res.redirect('/product/' + req.params.id);
                        }
                    })
                
            });
        }
    })
});

router.delete('/:id', middlewares.isAuthenticatedAdmin, function (req, res) {
    Product.findOneAndDelete({_id: req.params.id}, function (err, deletedProduct) {
        if (!err) {
            console.log(deletedProduct);
            rimraf('./public/Images/products/' + req.params.id, function () {
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    })
});


module.exports = router;