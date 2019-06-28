module.exports = {
    isAuthenticatedUser:
        function (req,res,next) {
            if (req.user && !req.user.isAdmin) {
                next();
            } else {
                res.redirect('/login');
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

