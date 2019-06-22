let express = require('express'),
    router = express.Router(),
    Category = require('../../moduls/post/category');

router.post('/', function (req, res) {
    let newCategory = new Category({name: req.body.name});
    if(req.body.parent === "اصلی") req.body.parent = "root";
    Category.findOne({name: req.body.parent},function (err, foundParent) {
        if(!err) {
            newCategory.parent = foundParent;
            foundParent.save(function (err) {
                if(!err) {
                    newCategory.save(function (err) {
                        if(!err) {
                            Category.findOne({name: "root"}, function (err, root) {
                                if(!err) {
                                    root.allInOne.push(newCategory['_id']);
                                    root.save(function (err) {
                                        if(!err) {
                                            res.redirect('/')
                                        }
                                    })
                                }
                            });
                        }
                    })
                }
            })
        }
    })
});

router.put('/', function (req, res) {
    Category.findOne({name: req.body.name}, function (err, category) {
        if(req.body.parent === "اصلی") req.body.parent = "root";
        Category.findOne({name: req.body.parent},function (err, foundParent) {
            if(!err) {
                category.parent = foundParent;
                foundParent.save(function (err) {
                    if(!err) {
                        category.name = req.body.newName;
                        category.save(function (err) {
                            if(!err) {
                                res.redirect('/');
                            }
                        })
                    }
                })
            }
        })
    })
});

router.delete('/', function (req, res) {
    Category.findOneAndDelete({name: req.body.name},
        function (err) {
            if(!err) {
                res.redirect('/');
            }
        })
});


module.exports = router;
