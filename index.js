var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var pkg = require('./package');
var routes = require('./routes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}))


app.use(flash());
//设置模板全局常亮
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

routes(app);

app.listen(config.port, '127.0.0.1', () => {
    console.log(`${pkg.name} listening on port ${config.port}`)
})