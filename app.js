var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var busboy = require('connect-busboy');
var flash = require('connect-flash');
var router = require('./router');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'sharephotos', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000*30},
    resave:true,
    saveUninitialized:true
}));
app.use(busboy({
    limits:{
        fileSize:10*1024*1024   //10MB
    }
}));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var error = req.flash('error');
    res.locals.error = error.length?error:null;
    var success = req.flash('success');
    res.locals.success = success.length?success:null;
    next();
});

app.use(router);
app.listen(8000,function(){
    console.log('listening on port 8000....');
});

