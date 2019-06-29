let express = require('express'),
    router = express.Router(),
    Product = require('../../moduls/post/product'),
    Customer = require('../../moduls/user/customer'),
    Comment = require('../../moduls/post/comment');


    router.post('/new', (req, res) => {
        if (req.user) {
            Product.findOne({_id: req.body.productId}, (err, foundProduct) => {
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
            res.redirect('/login');
        }
    });
    
    router.put('/:commentId', (req, res) => {
        if (req.user) {
            Comment.findOneAndUpdate({_id: req.params.commentId}, {body: req.body.body, rate: req.body.rate}, (err) => {
                if(!err) {
                    res.redirect('back');
                } else {
                    console.log(err);
                }
            });
        } else {
            res.redirect('/login');
        }
    });
    
    router.delete('/:commentId', (req, res) => {
        if (req.user) {
            Comment.findOneAndDelete({_id: req.params.commentId}, (err) => {
                if(!err) {
                    res.redirect('back');
                } else {
                    console.log(err);
                }
            });
        } else {
            res.redirect('/login');
        }
    });


module.exports = router;
