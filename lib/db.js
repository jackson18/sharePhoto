/**
 * Created by Administrator on 2015/5/10.
 */
var mysql = require('mysql');

var db_config = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'qi'
};
var pool = mysql.createPool({
    host:db_config.host,
    user:db_config.user,
    password:db_config.password,
    database:db_config.database
});
module.exports = pool;