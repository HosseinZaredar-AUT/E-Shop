let express = require('express'),
    router = express.Router();

    router.get('/', function(req, res) {
        res.render('user/cart');
    });

module.exports = router;
