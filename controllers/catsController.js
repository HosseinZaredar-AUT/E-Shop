Product = require('../moduls/post/product');
Category = require('../moduls/post/category');

let ITEMS_PER_PAGE = 3;

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
            // colors = ["#000000", "#ff0000", "#0080ff", "#00ff00"];
            colors = [/./];
        }
        if (brands === undefined) {
            brandsFiltered = false;
            brands = ["samsung", "LG", "Apple", "HTC"];
            brands = [/./];
        }
        if (price === undefined) {
            price = 100000;
        }
        let count;
        // if (brandsFiltered && colorsFiltered) {
        count = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).countDocuments();
        // } else if (brandsFiltered) {
        //     count = await Product.find().where('price').lte(price).where('properties.value').in(brands).countDocuments();
        // } else if (colorsFiltered) {
        //     count = await Product.find().where('colors').in(colors).where('price').lte(price).countDocuments();
        // } else {
        //     count = await Product.find().countDocuments();
        // }
        if (sort === 'new') {
            // if (brandsFiltered && colorsFiltered) {
            products = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).sort({ creationDate: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else if (brandsFiltered) {
            //     products = await Product.find().where('price').lte(price).where('properties.value').in(brands).sort({ creationDate: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else if (colorsFiltered) {
            //     products = await Product.find().where('colors').in(colors).where('price').lte(price).sort({ creationDate: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else {
            //     products = await Product.find().sort({ creationDate: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // }
        } else if (sort === 'popular') {
            // if (brandsFiltered && colorsFiltered) {
            products = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).sort({ boughtNumber: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else if (brandsFiltered) {
            //     products = await Product.find().where('price').lte(price).where('properties.value').in(brands).sort({ boughtNumber: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else if (colorsFiltered) {
            //     products = await Product.find().where('colors').in(colors).where('price').lte(price).sort({ boughtNumber: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else {
            //     products = await Product.find().sort({ boughtNumber: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // }
        } else if (sort === 'cheap') {
            // if (brandsFiltered && colorsFiltered) {
            products = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).sort({ price: 1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else if (brandsFiltered) {
            //     products = await Product.find().where('price').lte(price).where('properties.value').in(brands).sort({ price: 1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else if (colorsFiltered) {
            //     products = await Product.find().where('colors').in(colors).where('price').lte(price).sort({ price: 1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else {
            //     products = await Product.find().sort({ price: 1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // }
        } else if (sort === 'exp') {
            // if (brandsFiltered && colorsFiltered) {
            products = await Product.find().where('colors').in(colors).where('price').lte(price).where('properties.value').in(brands).sort({ price: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else if (brandsFiltered) {
            //     products = await Product.find().where('price').lte(price).where('properties.value').in(brands).sort({ price: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else if (colorsFiltered) {
            //     products = await Product.find().where('colors').in(colors).where('price').lte(price).sort({ price: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // } else {
            //     products = await Product.find().sort({ price: -1 }).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
            // }
        }
        if (!brandsFiltered)
            brands = []
        if (!colorsFiltered)
            colors = []
        const lastPage = Math.floor((count - 0.5) / ITEMS_PER_PAGE + 1);
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        const end = start + products.length - 1;
        res.render('product/category', {
            prods: products,
            count: count,
            colors: colors,
            price: price,
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
            brandsFiltered: brandsFiltered,
            searchBody: ''
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
            // colors = ["#000000", "#ff0000", "#0080ff", "#00ff00"];
            colors = [/./];
        }
        if (brands === undefined) {
            brandsFiltered = false;
            // brands = ["samsung", "LG", "Apple", "HTC"];
            brands = [/./];
        }
        if (price === undefined) {
            price = 100000;
        }
        let popCat;
        // if (brandsFiltered && colorsFiltered) {
        popCat = await Category.find({ name: catName }).populate({
            path: 'products',
            match: {
                price: { $lte: price },
                colors: { $in: colors },
                'properties.value': { $in: brands }
            }
        });
        // } else if (brandsFiltered) {
        // popCat = await Category.find({ name: catName }).populate({
        //     path: 'products',
        //     match: {
        //         price: { $lte: price },
        //         'properties.value': { $in: brands }
        //     }
        // });
        // } else if (colorsFiltered) {
        // popCat = await Category.find({ name: catName }).populate({
        //     path: 'products',
        //     match: {
        //         price: { $lte: price },
        //         colors: { $in: colors }
        //     }
        // });
        // } else {
        // popCat = await Category.find({ name: catName }).populate({
        //     path: 'products',
        //     match: {
        //         price: { $lte: price }
        //     }
        // });
        // }
        allProducts = popCat[0].products;
        const count = allProducts.length;
        let begin = (page - 1) * ITEMS_PER_PAGE;
        allProducts = sortIt(allProducts,sort);
        let products = allProducts.slice(begin, begin + ITEMS_PER_PAGE);
        const lastPage = Math.floor((count - 0.5) / ITEMS_PER_PAGE + 1);
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        const end = start + products.length - 1;
        if (!brandsFiltered)
            brands = []
        if (!colorsFiltered)
            colors = []
        res.render('product/category', {
            prods: products,
            count: count,
            colors: colors,
            price: price,
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
            brandsFiltered: brandsFiltered,
            searchBody: ''
        });

    } catch (err) {
        // const error = new Error(err);
        // error.httpStatusCode = 500;
        // return next(error);
    }
};

exports.search = async (req, res, next) => {
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
            // colors = ["#000000", "#ff0000", "#0080ff", "#00ff00"];
            colors = [/./];
        }
        if (brands === undefined) {
            brandsFiltered = false;
            // brands = ["samsung", "LG", "Apple", "HTC"];
            brands = [/./];
        }
        if (price === undefined) {
            price = 100000;
        }
        const search = req.query.search;
        let allProducts = await Product
            .find({
                $or: [
                    { name: { $regex: search } },
                    { id: search }
                ]
                ,
                price: { $lte: price },
                colors: { $in: colors },
                'properties.value': { $in: brands }
            });
        let popProducts = await Product.find({
            price: { $lte: price },
            colors: { $in: colors },
            'properties.value': { $in: brands }
        }).populate({
            path: 'category',
            match: {
                name: { $regex: search }
            }
        });
        popProducts = popProducts.filter(a => {
            if (a.category) {
                return true;
            } else {
                return false;
            }
        })
        allProducts = allProducts.concat(popProducts);
        const count = allProducts.length;
        let begin = (page - 1) * ITEMS_PER_PAGE;
        allProducts = sortIt(allProducts,sort);
        let products = allProducts.slice(begin, begin + ITEMS_PER_PAGE);
        const lastPage = Math.floor((count - 0.5) / ITEMS_PER_PAGE + 1);
        const start = (page - 1) * ITEMS_PER_PAGE + 1;
        const end = start + products.length - 1;
        if (!brandsFiltered)
            brands = []
        if (!colorsFiltered)
            colors = []
        res.render('product/category', {
            prods: products,
            count: count,
            colors: colors,
            price: price,
            brands: brands,
            pageTitle: 'جستجو',
            dir: 'search',
            sort: sort,
            page: page,
            lastPage: lastPage,
            paths: [],
            start: start,
            end: end,
            colorsFiltered: colorsFiltered,
            brandsFiltered: brandsFiltered,
            searchBody: search
        });
    } catch (err) {

    }
};

const sortIt = (allProducts , sort) => {
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
    return allProducts;
}