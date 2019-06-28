let express = require('express'),
    router = express.Router(),
    Order = require('../../moduls/user/order');


router.post('/', async function(req, res) {
    if (req.body.status == 'fail') {
        res.redirect('userDashboard');
    } else {
        // updating order's status
        order = await Order.findById(req.body.orderId).populate('products.productId').exec();
        order.status = 'awaitsDelivery';
        await order.save();

        // updating remainingNumber and boughtNumber of products
        for (product of order.products) {
            product.productId.remainingNumber -= product.quantity;
            product.productId.boughtNumber += product.quantity;
            if (product.productId.remainingNumber <= 0) {
                product.productId.status = 'unavailable';
            } 
            await product.productId.save();
            res.redirect('/userDashboard');
        }
    }
});


module.exports = router;