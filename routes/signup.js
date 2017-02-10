var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//注册，判断是否登录，如果登录将会显示已经登录 立即 返回之前的页面，没有登录继续next
router.get('/', checkNotLogin, (req, res, next) => {
    res.send(req.flash());
})

router.post('/', checkNotLogin, (req, res, next) => {
    res.send(req.flash());
})

module.exports = router;