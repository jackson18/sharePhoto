/**
 * Created by Administrator on 2015/5/9.
 */
var user = require('../lib/user');
var eventproxy = require('eventproxy');
var tools = require('../lib/tools');

function showReg(req,res,next){
    res.render('reg');
}

function reg(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;
    var email = req.body.email;
    var ep = new eventproxy();

    ep.on('reg_error',function(tip){
        console.log(tip);
        req.flash('error',tip);
        res.redirect('/reg');
    });
    if(/[^1-9a-zA-Z]/.test(username)){
        ep.emit('reg_error','用户名只能为数字或字母');
        return;
    }
    if([user,password,repeatPassword,email].some(function(item){return item === '';})){
        ep.emit('reg_error','信息不完整');
        return;
    }
    if(username.length < 3){
        ep.emit('reg_error','用户不能少于3个字符');
        return;
    }
    if(password != repeatPassword){
        ep.emit('reg_error','两次输入密码不一致');
        return;
    }

    var newUser = new user({
        'user_name':username,
        'password':tools.md5(password),
        'email':email,
        'portrait_url':'http://justgoblog.qiniudn.com/imagesdefault.png',
        'signature':''
    });

    user.getByName(newUser.user_name,function(err,result){
        if(err){
            console.log(err);
        }else{
            newUser.add(function(err,row){
                if(err){
                    console.log(err);
                }else{
                    newUser.id = row.insertId;
                    req.session.user = newUser;
                    res.redirect('/');
                }
            });
        }
    });
}

function showLogin(req,res,next){
    res.render('login');
}

function login(req,res,next){
    var username = req.body.username;
    var password = tools.md5(req.body.password);
    var ep = new eventproxy();

    ep.on('login_error',function(tip){
        req.flash('error',tip);
        res.redirect('/login');
    });
    user.getByName(username,function(err,result){
        if(result.length>0){
            if(password!=result[0].password){
                ep.emit('login_error','用户或密码错误');
            }else{
                req.session.user = result[0];
                res.redirect('/');
            }
        }else{
            ep.emit('login_error','用户或密码错误');
        }
    });
}

function logout(req,res,next){
    req.session.user = null;
    res.redirect('/');
}


exports.showReg = showReg;
exports.reg = reg;
exports.showLogin = showLogin;
exports.login = login;
exports.logout = logout;