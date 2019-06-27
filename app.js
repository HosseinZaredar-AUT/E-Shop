let express = require('express'),
    CatsRouter = require('./routes/cats');
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    path     = require('path'),
    fileUpload = require('express-fileupload'),
    methodOverride = require('method-override'),
    seedDB = require('./seed'),
    mongoose = require('mongoose'),
    indexRouter = require('./routes/index/index'),
    categoryRouter = require('./routes/admin/category'),
    productRouter = require('./routes/admin/product'),
    registerRouter = require('./routes/register'),
    loginRouter = require('./routes/login'),
    userDashboardRouter = require('./routes/customer/dashboard/dashboard'),
    adminDashboardRouter = require('./routes/admin/dashboard/dashboard'),
    cartRouter = require('./routes/customer/cart'),
    orderRouter = require('./routes/customer/order'),
    middlewares = require('./middlewares/index'),
    usefulFunctions = require('./middlewares/usefulFunctions'),
    session = require('express-session'),
    Category = require('./moduls/post/category');

// passport require
var passport = require('passport');
require('./passport')(passport);

// express setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// session setup
var session = require('express-session');
app.use(session({
    secret: 'some untold secret',
    resave: false,
    saveUninitialized: false
}));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// fileUpload setup
app.use(fileUpload());

app.use(cors());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    Category.findOne({name: 'root'}, function (err, root) {
        if(!err) {
            root.getChildrenTree(function (err, childs) {
                if(!err) {
                    res.locals.cats = usefulFunctions.getDataArray(childs);
                    next();
                }
            })
        }
    });
});

app.use('/category', categoryRouter);
app.use('/cats', CatsRouter);
app.use('/product', productRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/userDashboard', middlewares.isAuthenticatedUser ,userDashboardRouter);
app.use('/adminDashboard', middlewares.isAuthenticatedAdmin ,adminDashboardRouter);
app.use('/cart', middlewares.isAuthenticatedUser,cartRouter);
app.use('/order', orderRouter);
app.use('/', indexRouter);

seedDB();

app.listen(3000, function(err) {
    if(!err) console.log("Server Has Started");
});

