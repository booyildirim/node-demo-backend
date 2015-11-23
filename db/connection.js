/**
 * Created by yildirimb on 23/11/2015.
 */
var mysql      = require('mysql');
exports.pool = mysql.createPool({
    connectionLimit : 5,
    acquireTimeout: 500,
    host     : 'localhost',
    user     : 'root',
    password : 'test123',
    database : 'nodetest'
});

