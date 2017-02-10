module.exports = (app) => {
    app.get('/', (req, res, next) => {
        console.log(res.locals);
        res.redirect('/posts');
    })
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    //文章页
    app.use('/posts', require('./posts'));
    app.use('/signout', require('./signout'));
}