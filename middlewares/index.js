module.exports = {
    isAuthenticatedUser:
        function (req,res,next) {
            if(req.session.user && !req.session.user.isAdmin){
                next();
            } else {
                res.redirect('/');
            }
        },
    isAuthenticatedAdmin:
        function (req,res,next) {
            if(req.session.user && req.session.user.isAdmin){
                next();
            } else {
                res.redirect('/');
            }
        }
};

