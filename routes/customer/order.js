let express = require('express'),
    router = express.Router();

    router.get('/', function(req, res) {
        res.render('user/order');
    });


module.exports = router;
