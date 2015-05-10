/**
 * Created by Administrator on 2015/5/9.
 */
exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
        return res.redirect('/');
    }
    next();
};

exports.checkLogin = function(req,res,next){
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
};