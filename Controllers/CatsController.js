Product = require('../moduls/post/product');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        console.log('received:');
        console.log(products);
        // res.render('', {
        //     prods: products,
        //     pageTitle: 'محصولات'
        // });
        res.render('product/category')
    } catch (err) {
        // const error = new Error(err);
        // error.httpStatusCode = 500;
        // return next(error);
    }
};
