Product = require('../moduls/post/product');
Category = require('../moduls/post/category');

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
        console.log(products);
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

exports.getCatProduct = async (req, res, next) => {
    try {
        let page = req.query.page;
        let catName = req.params.catName;
        if (page === undefined) {
            page = 1;
        }
        // console.log(catName);
        // console.log(page);
        const popCat = await Category.find({name: catName}).populate('products');
        allProducts = popCat[0].products;
        console.log(allProducts[0]);
        const count = allProducts.length;
        let begin = (page - 1) * ITEMS_PER_PAGE;
        const products = allProducts.slice(begin, begin + ITEMS_PER_PAGE);
        const lastPage = Math.floor((count - 0.5) / ITEMS_PER_PAGE + 1);
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        const end = start + products.length - 1;
        console.log(products.colors);
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
