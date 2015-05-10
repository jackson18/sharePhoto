/**
 * Created by Administrator on 2015/5/10.
 */
var db = require('./db');

function User(user){
    this.user_name = user.user_name;
    this.password = user.password;
    this.email = user.email;
    this.portrait_url = user.portrait_url;
    this.signature = user.signature;
}

User.getByName = function(username,callback){
    db.query('select * from user where user_name=?',[username],function(err,rows){
        if(err){
            callback(err);
        }else{
            callback(null,rows);
        }
    });
};

User.prototype.add = function(callback){
    db.query('insert into user(user_name,password,email,portrait_url,signature) values(?,?,?,?,?)',[this.user_name,this.password,this.email,this.portrait_url,this.signature],function(err,rows){
        if(err){
            callback(err);
        }else{
            callback(err,rows);
        }
    });
};


module.exports = User;