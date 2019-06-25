Product = require('../moduls/post/product');
Category = require('../moduls/post/category');

let ITEMS_PER_PAGE = 1;

exports.getProducts = async (req, res, next) => {
    try {
        let products = null;
        let page = req.query.page;
        let sort = req.query.sort;
        console.log(sort);
        if (page === undefined) {
            page = 1;
        }
        if (sort === undefined) {
            sort = 'new';
        }
        console.log(page);
        const count = await Product.find().countDocuments();
        console.log(count);
        if (sort === 'new') {
            products = await Product.find().sort('date').skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        } else if (sort === 'popular') {
            products = await Product.find().sort({boughtNumber: -1}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        } else if (sort === 'cheap') {
            products = await Product.find().sort({price: 1}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        } else if (sort === 'exp') {
            products = await Product.find().sort({price: -1}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        }
        const lastPage = Math.floor((count - 0.5) / ITEMS_PER_PAGE + 1);
        console.log("lastPage: " + lastPage);
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        console.log("here");
        const end = start + products.length - 1;
        console.log(products);
        res.render('product/category', {
            prods: products,
            pageTitle: 'محصولات',
            dir: '',
            sort: sort,
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
        let sort = req.query.sort;
        console.log('ssr' + sort);
        if (page === undefined) {
            page = 1;
        }
        if (sort === undefined) {
            sort = 'new';
        }
        console.log('ssrfgg' + sort);

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
            pageTitle: catName,
            dir: catName,
            sort: sort,
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
