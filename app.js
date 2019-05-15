var express = require('express'),
    path = require('path'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(3000, function (err) {
    if(!err) console.log("Server Has Started");
});
