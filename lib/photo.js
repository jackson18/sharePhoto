/**
 * Created by Administrator on 2015/5/10.
 */
var pool = require('./db');
var tools = require('./tools');
var conf = require('../conf/conf');

exports.addPhoto = function(option,callback){
    pool.query('insert into photos values(null,?,?,?,now())',[option.url,option.description,option.user_id],function(err,rows){
        if(err){
            callback(err);
        }else{
            callback(null,rows);
        }
    })
};

exports.getPhotos = function(pageNum,callback){
    pool.query('select p.id,p.url,p.description,p.user_id,p.create_time,u.user_name from photos p,user u where p.user_id=u.id order by p.create_time desc limit ?,?',[(pageNum-1)*conf.pageSize,conf.pageSize],function(err,rows){
        if(err){
            callback(err);
        }else{
            rows.forEach(function(row){
                row.create_time = tools.formatDate(row.create_time,true);
            });
            callback(null,rows);
        }
    });
};