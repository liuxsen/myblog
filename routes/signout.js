var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, (req, res, next) => {
    // res.send(req.flash());
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/posts');
})

module.exports = router;