var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var UserModel = require('../models/users');
var sha1 = require('sha1');

//get /signin 登录页 如果没有登录就继续走；如果已经登录就返回
router.get('/', checkNotLogin, (req, res, next) => {
    console.log(req.flash())
    res.render('signin');
});
// post /signin 登录
router.post('/', checkNotLogin, (req, res, next) => {
    //res.send(req.flash());
    // res.render('signin');
    var name = req.fields.name;
    var password = req.fields.pwd;

    UserModel.getUserByName(name)
        .then((user) => {
            if (!user) {
                req.flash('error', '用户不存在');
                return res.redirect('back');
            }
            if (sha1(password) !== user.password) {
                req.flash('error', '用户名或者密码错误');
                return res.redirect('back');
            }
            req.flash('success', '登录成功');
            delete user.password;
            req.session.user = user;
            res.redirect('/posts');
        })
        .catch(next);

});

module.exports = router;