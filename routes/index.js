module.exports = (app) => {
    app.use('/', (req, res, next) => {
        res.redirect('/posts');
    })
    app.use('/signup', require('./signup'));
    app.use('/signin', require('../signin'));
    //文章页
    app.use('/posts', require('./posts'));
}