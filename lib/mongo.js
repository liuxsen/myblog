var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestap = require('objectid-to-timestamp');
mongolass.plugin('addCreatedAt', {
    afterFind(retults) {
        retults.forEach((item) => {
            item.create_at = moment(objectIdToTimestap(item._id).format('YYYY-MM-DD HH:mm'));
        });
        return results;
    },
    afterFindOne(result) {
        if (result) {
            result.created_at = moment(objectIdToTimestap(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
})

exports.User = mongolass.model('User', {
    name: { type: 'string' }, //姓名
    password: { type: 'string' }, //密码
    avatar: { type: 'string' }, //头像
    gender: { type: 'string', enum: ['m', 'f', 'x'] }, //性别 男 女 保密
    bio: { type: 'string' } //个人简介
})