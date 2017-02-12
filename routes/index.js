module.exports = (app) => {
    app.get('/', (req, res, next) => {
        console.log(req.flash());
        res.redirect('/posts');
    })
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    //文章页
    app.use('/posts', require('./posts'));
}