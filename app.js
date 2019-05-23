let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    path     = require('path'),
    fileUpload = require('express-fileupload'),
    methodOverride = require('method-override'),
    seedDB = require('./seed'),
    mongoose = require('mongoose');

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

// connecting to database
var databaseURL = 'mongodb://127.0.0.1/db'; // change it to your database
mongoose.connect(databaseURL, {useNewUrlParser: true}, function(err) {
    if (err)
        console.log('Unable to Connect to Database');
    else
        console.log('Connected to Database');
});

let indexRouter = require('./routes/index/index'),
    dashboardRouter = require('./routes/admin/dashboard/dashboard'),
    adminRouter = require('./routes/admin/admin');

app.use('/dashboard', dashboardRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);

app.listen(3000, function(err) {
    if(!err) console.log("Server Has Started");
});

