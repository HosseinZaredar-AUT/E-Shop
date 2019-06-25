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
    Property = require('../../moduls/post/property'),
    Comment = require('../../moduls/post/comment');


router.get('/:productId', async (req, res) => {
    try {
        const prodId = req.params.productId;
        const product = await Product.findById(prodId);
        const recommends = await Product.find({category: product.category});
        let root = await Category.findOne({name: 'root'});
        let cats = [];
        root.getChildrenTree(function (err, childs) {
            if(!err) {
                let cats = usefulFunctions.getDataArray(childs);
                res.render('product/product', {
                    product: product,
                    cats: cats,
                    recommends: recommends
                });
            }
        });
    } catch (e) {

    }
});

router.put('/addComment/:productId', async (req, res) => {
    try {
        const prodId = req.params.productId;
        console.log(prodId);
        const product = await Product.findById(prodId);
        console.log(product);
        const comments = product.comments;
        const comment = new Comment({
            customer: req.session.user,
            product: product._id,
            body: req.body.commentBody,
            rate: req.body.productRate
        });
        comments.push(comment);
        product.save();
        comment.save();
         res.sendStatus(201);
    } catch (e) {
        console.log(e);
    }
});

router.post('/', function (req, res) {
    let properties = req.body.property;
    let propertiesArray = [];
    for (let i = 0; i < properties.length - 1; i++) {
        propertiesArray.push(new Property({
            key: properties[i],
            value: properties[++i]
        }));
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
                        res.redirect('/adminDashboard');
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
            propertiesArray.push(new Property({
                key: properties[i],
                value: properties[++i]
            }));
        }
    }
    if (typeof (req.body.colors) == 'string')
        req.body.colors = [req.body.colors]
        
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
                if (typeof (req.body.filepond) == 'string') {
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
    Product.findOneAndDelete({id: req.params.id}, function (err) {
        if (!err) {
            rimraf('./public/Images/products/' + id, function () {
                res.redirect('/');
            });
        }
    })
});


module.exports = router;