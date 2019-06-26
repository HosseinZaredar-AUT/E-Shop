var LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Customer = require('./moduls/user/customer'),
    Admin = require('./moduls/user/admin');

module.exports = function(passport) {
    passport.use(
      new LocalStrategy({usernameField: 'email', passwordField: 'password'},
        function(email, password, done) {
            // checking if the user is admin
            Admin.findOne({email: email}, function(err, admin) {
                if (admin) {
                    bcrypt.compare(password, admin.password, function(err, isEqual) {
                        if (isEqual)
                            return done(null, admin);
                        else
                            return done(null, false);
                    });                 
                } else {
                    // chceking if the user is a customer
                    Customer.findOne({email: email}, function(err, customer) {
                        if (!customer)
                            return done(null, false);
                        
                        bcrypt.compare(password, customer.password, function(err, isEqual) {
                            if (isEqual)
                                return done(null, customer);
                            else
                                return done(null, false);
                        });
                    });
                }
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, admin) {
            if (admin) {
                done(err, admin);
            } else {
                Customer.findById(id, function(err, customer) {
                    done(err, customer);
                });
            }
        });
    }); 
}