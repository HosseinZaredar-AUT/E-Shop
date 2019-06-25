let express = require('express'),
    router = express.Router(),
    path = require('path'),
    Category = require('../../../moduls/post/category'),
    Product = require('../../../moduls/post/product'),
    Order = require('../../../moduls/user/order'),
    Customer = require('../../../moduls/user/customer');

router.get('/', function (req, res) {
    Category.findOne(function (err, root) {
        if(!err) {
            root.getChildrenTree(function (err, childs) {
                if(!err) {
                    let cats = getDataArray(childs);
                    Order.find({})
                    .populate('products.productId')
                    .exec(function(err, orders) {
                        res.render('user/adminDashboard', {cats: cats, orders: orders});
                    });  
                }
            })
        }
    })
});

function getDataArray(childs) {
    let dataArray = [];
    let stack = [];
    childs.forEach((child) => {
        child['level'] = 0;
        stack.push(child);
    });
    while (stack.length!==0) {
        let element = stack.pop();
        dataArray.push({
            name: element.name,
            level: element.level
        });
        if(element.children.length !== 0){
            element.children.forEach((child) => {
                 child['level'] = element.level + 1;
                 stack.push(child);
            })
        }
    }
    return dataArray;
}

module.exports = router;

