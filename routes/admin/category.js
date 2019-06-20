let express = require('express'),
    router = express.Router(),
    Category = require('../../moduls/post/category');

router.get('/', function (req, res) {
    Category.findOne({name: 'root'},function (err, root) {
        root.getChildrenTree(function (err, childs) {
            if(!err) {
                let categories = [];
                dfs(childs, categories);
                res.render('index', {categories: categories})
            }
        })
    })
});

router.post('/', function (req, res) {
    let newCategory = new Category({name: req.body.name});
    Category.findOne({name: req.body.parent},function (err, foundParent) {
        if(!err) {
            newCategory.parent = foundParent;
            foundParent.save(function (err) {
                if(!err) {
                    newCategory.save(function (err) {
                        if(!err) {
                            res.redirect('/category')
                        }
                    })
                }
            })
        }
    })
});

router.put('/:id', function (req, res) {
    Category.findOne({_id: req.params.id}, function (err, category) {
        Category.findOne({name: req.body.parent},function (err, foundParent) {
            if(!err) {
                category.parent = foundParent;
                foundParent.save(function (err) {
                    if(!err) {
                        category.name = req.body.name;
                        category.save(function (err) {
                            if(!err) {
                                res.redirect('/category');
                            }
                        })
                    }
                })
            }
        })
    })
});

router.delete('/:id', function (req, res) {
    Category.findOneAndDelete({_id: req.params.id},
        function (err) {
            if(!err) {
                res.redirect('/category');
            }
        })
});

function dfs(arr, categories) {
    if(arr.length!==0) {
        arr.forEach(function (child) {
            categories.push(child);
            dfs(child.children, categories);
        })
    }
}

module.exports = router;
