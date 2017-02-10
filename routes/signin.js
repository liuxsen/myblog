var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//get /signin 登录页 如果没有登录就继续走；如果已经登录就返回
router.get('/', checkNotLogin, (req, res, next) => {
    res.send(req.flash());
});
// post /signin 登录
router.post('/', checkNotLogin, (req, res, next) => {
    res.send(req.flash());
});

module.exports = router;