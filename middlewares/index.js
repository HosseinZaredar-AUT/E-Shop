module.exports = {
    isAuthenticatedUser:
        function (req,res,next) {
            if (req.user && !req.user.isAdmin) {
                next();
            } else {
                res.redirect('/register');
            }
        },
    isAuthenticatedAdmin:
        function (req,res,next) {
            if(req.user && req.user.isAdmin){
                next();
            } else {
                res.redirect('/');
            }
        }
};

