var express = require('express');
var router = express.Router();


router.get('/shows', function(req, res){
    res.send('api is working');
});


module.exports = router;