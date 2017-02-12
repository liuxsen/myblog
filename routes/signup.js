var path = require('path');
var fs = require('fs');
var sha1 = require('sha1');
var UserModel = require('../models/users.js');
var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//注册，判断是否登录，如果登录将会显示已经登录 立即 返回之前的页面，没有登录继续next
router.get('/', checkNotLogin, (req, res, next) => {
    // res.send(req.flash());
    res.render('signup')
})

router.post('/', checkNotLogin, (req, res, next) => {
    // res.send(req.flash());
    console.log(req.fields);
    // console.log(req.files)
    //获得图片name
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var name = req.fields.name;
    var password = req.fields.pwd;
    var gender = req.fields.gender;
    var bio = req.fields.bio; //简介
    try {
        if (!(name.length > 1 && name.length <= 10)) {
            throw new Error('名字请限制在1-10个字符')
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是m、f或 x');
        }
        if (!(bio.length) >= 1 && bio.length <= 30) {
            throw new Error('个人简介请限制在1-30个字符')
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像')
        }
        console.log(password.length < 2, password.length)
        if (password.length < 2) {
            throw new Error('密码至少6个字符')
        }
    } catch (e) {
        fs.unlink(req.files.avatar.path);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }
    password = sha1(password);
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };
    UserModel.create(user)
        .then((result) => {
            console.log(result)
            user = result.ops[0];
            console.log(user);
            //删除密码
            delete user.password;
            req.session.user = user;
            // 写入flash
            req.flash('success', '注册成功');
            //跳转到首页
            res.redirect('/posts');
        })
        .catch((e) => {
            fs.unlink(req.files.avatar.path);
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error', '用户名已被占用');
                return res.redirect('/signup');
            }
        })
})

module.exports = router;