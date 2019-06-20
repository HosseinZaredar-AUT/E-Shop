let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    path     = require('path'),
    fileUpload = require('express-fileupload'),
    methodOverride = require('method-override'),
    seedDB = require('./seed'),
    mongoose = require('mongoose'),
    indexRouter = require('./routes/index/index'),
    dashboardRouter = require('./routes/admin/dashboard/dashboard'),
    adminRouter = require('./routes/admin/admin'),
    categoryRouter = require('./routes/admin/category'),
    productRouter = require('./routes/admin/product');

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


app.use('/dashboard', dashboardRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/', indexRouter);

seedDB();

app.listen(3000, function(err) {
    if(!err) console.log("Server Has Started");
});

