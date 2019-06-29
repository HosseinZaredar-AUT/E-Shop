let express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    uuid = require('uuid/v1');


// to upload a file as it is dragged into filepond
router.post('/upload', function (req, res) {
    var name = uuid();
    var fullType = req.files.filepond.mimetype;
    var type = fullType.substring(fullType.indexOf('/') + 1);

    // creating temp_images directory if it doesn't exist
    var dir = './temp_images';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // saving the image in temp_images
    req.files.filepond.mv('./temp_images/' + name + '.' + type).then(function (err) {
        if (err)
            throw err;
        res.send(name + '.' + type);
    });
});

// to revert file upload
router.delete('/revert', function (req, res) {
    fs.unlink('./temp_images/' + req.body.path, function (err) {
        if (err)
            console.log(err);
    });
});

module.exports = router;