Product = require('../moduls/post/product');
Category = require('../moduls/post/category');

let ITEMS_PER_PAGE = 1;

exports.getProducts = async (req, res, next) => {
    try {
        let products = null;
        let page = req.query.page;
        let sort = req.query.sort;
        let colors = req.query.color;
        let brands = req.query.brand;
        let price = req.query.price;
        let colorsFiltered = true;
        let brandsFiltered = true;
        if (page === undefined) {
            page = 1;
        }
        if (sort === undefined) {
            sort = 'new';
        }
        if (colors === undefined) {
            colorsFiltered = false;
            colors = ["#000000", "#ff0000", "#0080ff", "#00ff00"];
        }
        if (brands === undefined) {
            brandsFiltered = false;
            brands = ["samsung", "LG", "Apple", "HTC"];
        }
        if (price === undefined) {
            price = 100000;
        }
        const count = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).countDocuments();
        if (sort === 'new') {
            products = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).sort({creationDate: -1}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        } else if (sort === 'popular') {
            products = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).sort({boughtNumber: -1}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        } else if (sort === 'cheap') {
            products = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).sort({price: 1}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        } else if (sort === 'exp') {
            products = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).sort({price: -1}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
        }
        const lastPage = Math.floor((count - 0.5) / ITEMS_PER_PAGE + 1);
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        const end = start + products.length - 1;
        res.render('product/category', {
            prods: products,
            count: count,
            colors:colors,
            price:price,
            brands: brands,
            pageTitle: 'مصولات',
            dir: '',
            sort: sort,
            page: page,
            lastPage: lastPage,
            paths: [],
            start: start,
            end: end,
            colorsFiltered: colorsFiltered,
            brandsFiltered: brandsFiltered
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
        let colors = req.query.color;
        let brands = req.query.brand;
        let price = req.query.price;
        let colorsFiltered = true;
        let brandsFiltered = true;
        if (page === undefined) {
            page = 1;
        }
        if (sort === undefined) {
            sort = 'new';
        }
        if (colors === undefined) {
            colorsFiltered = false;
            colors = ["#000000", "#ff0000", "#0080ff", "#00ff00"];
        }
        if (brands === undefined) {
            brandsFiltered = false;
            brands = ["samsung", "LG", "Apple", "HTC"];
        }
        if (price === undefined) {
            price = 100000;
        }
        console.log(brands);
        const popCat = await Category.find({name: catName}).populate({
            path: 'products',
            match: {
                price: {$lte: price},
                colors: {$in: colors},
                'properties.value': {$in: brands}
            }
        });
        allProducts = popCat[0].products;
        console.log(allProducts);
        const count = allProducts.length;
        let begin = (page - 1) * ITEMS_PER_PAGE;
        if (sort === 'new') {
            allProducts.sort((a, b) => {
                if (a.creationDate < b.creationDate) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else if (sort === 'popular') {
            allProducts.sort((a, b) => {
                if (a.boughtNumber < b.boughtNumber) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else if (sort === 'cheap') {
            allProducts.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else if (sort === 'exp') {
            allProducts.sort((a, b) => {
                if (a.price < b.price) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }
        let products = allProducts.slice(begin, begin + ITEMS_PER_PAGE);
        const lastPage = Math.floor((count - 0.5) / ITEMS_PER_PAGE + 1);
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        const end = start + products.length - 1;
        res.render('product/category', {
            prods: products,
            count: count,
            colors:colors,
            price:price,
            brands: brands,
            pageTitle: catName,
            dir: catName,
            sort: sort,
            page: page,
            lastPage: lastPage,
            paths: [],
            start: start,
            end: end,
            colorsFiltered: colorsFiltered,
            brandsFiltered: brandsFiltered
        });

    } catch (err) {
        // const error = new Error(err);
        // error.httpStatusCode = 500;
        // return next(error);
    }
};
