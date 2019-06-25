var LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Customer = require('./moduls/user/customer');

module.exports = function(passport) {
    passport.use(
      new LocalStrategy({usernameField: 'email', passwordField: 'password'},
        function(email, password, done) {
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
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Customer.findById(id, function(err, user) {
            done(err, user);
        });
    }); 
}