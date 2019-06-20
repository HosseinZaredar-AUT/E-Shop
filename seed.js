let mongoose = require('mongoose'),
    Category = require('./moduls/post/category');

    let seedDB = function () {
    // connecting to database
    let databaseURL = 'mongodb://127.0.0.1/e-shop'; // change it to your database

    mongoose.connect(databaseURL, {useNewUrlParser: true}, function(err) {
        if (err)
            console.log('Unable to Connect to Database');
        else
            console.log('Connected to Database');
    });

    mongoose.connection.dropDatabase();


    Category.create({
            name: 'root'
        }, function (err,createdCategory) {
            createdCategory.save(function (err) {
                if(err) console.log(err);
                else {
                    console.log("db seeded.");
                }
            });
        });


};

module.exports = seedDB;
