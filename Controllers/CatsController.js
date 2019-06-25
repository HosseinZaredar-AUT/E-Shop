Product = require('../moduls/post/product');

let ITEMS_PER_PAGE = 1;

exports.getProducts = async (req, res, next) => {
    try {
        let page = req.query.page;
        if (page === undefined) {
            page = 1;
        }
        console.log(page);
        const count = await Product.find().countDocuments();
        console.log(count);
        const products = await Product.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        const lastPage = Math.floor((count - 0.5) / ITEMS_PER_PAGE + 1);
        console.log("lastPage: " + lastPage);
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        console.log("here");
        const end = start + products.length - 1;
        res.render('product/category', {
            prods: products,
            pageTitle: 'محصولات',
            page: page,
            lastPage: lastPage,
            paths: [],
            start: start,
            end: end
        });
    } catch (err) {
        // const error = new Error(err);
        // error.httpStatusCode = 500;
        // return next(error);
    }

};
