let express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    filepond = require('filepond'),
    uuid = require('uuid/v1'),
    usefulFunctions = require('../../middlewares/usefulFunctions'),
    Category = require('../../moduls/post/category'),
    Product = require('../../moduls/post/product'),
    Comment = require('../../moduls/post/comment'),
    Customer = require('../../moduls/user/customer');

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

router.post('/:productId/comment/new', (req, res) => {
    console.log(req.body);
    if(req.user) {
        Product.findOne({_id: req.params.productId}, (err, foundProduct) => {
            if (!err) {
                new Comment({
                    body: req.body.body,
                    customer: {
                        _id: req.user._id,
                        username: req.user.username
                    },
                    product: foundProduct['_id'],
                    rate: req.body.rate
                }).save((err, savedComment) => {
                    if (!err) {
                        foundProduct.comments.push(savedComment._id);
                        foundProduct.save((err) => {
                            if (!err)
                                res.redirect('back');
                        });
                    }
                });
            } else {
                console.log(err);
            }
        });
    } else {
        res.redirect('/login')
    }
});

router.put('/:productId/comment/:commentId', (req, res) => {
    Comment.findOneAndUpdate({_id: req.params.commentId}, {body: req.body.body, rate: req.body.rate}, (err) => {
        if(!err) {
            res.redirect('back');
        } else {
            console.log(err);
        }
    });
});

router.delete('/:productId/comment/:commentId', (req, res) => {
    Comment.findOneAndDelete({_id: req.params.commentId}, (err) => {
        if(!err) {
            res.redirect('back');
        } else {
            console.log(err);
        }
    });
});


router.post('/:productId/fav/new', (req, res) => {
    if(req.user) {
        if(!req.user.isAdmin) {
            Customer.findOne({_id: req.user._id}, (err, foundCustomer) => {
                if (!err) {
                    let tmp = true;
                    foundCustomer.favorites.forEach(function (fav) {
                        if (fav.toString() === req.params.productId.toString()) {
                            tmp = false;
                        }
                    });
                    if (tmp) foundCustomer.favorites.push(req.params.productId);
                    foundCustomer.save((err) => {
                        if (!err) {
                            res.send('done');
                        }
                    })
                } else {
                    console.log(err);
                }
            });
        } else {
            res.send('admin');
        }
    } else {
        res.send('login');
    }
});


router.post('/', function (req, res) {
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

router.put('/:id', function (req, res) {
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

// to upload a file as it is dragged into filepond
router.post('/upload', function (req, res) {
    var name = uuid();
    var fullType = req.files.filepond.mimetype;
    var type = fullType.substring(fullType.indexOf('/') + 1);

    // creating temp_images directory if it doesn't exist
    var dir = './temp_images';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // saving the image in temp_images
    req.files.filepond.mv('./temp_images/' + name + '.' + type).then(function (err) {
        if (err)
            throw err;
        res.send(name + '.' + type);
    });
});

// to revert file upload
router.delete('/revert', function (req, res) {
    fs.unlink('./temp_images/' + req.body.path, function (err) {
        if (err)
            console.log(err);
    });
});

router.delete('/:id', function (req, res) {
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