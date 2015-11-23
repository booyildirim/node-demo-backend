/**
 * Created by yildirimb on 23/10/2015.
 */
    
var connection = require('../db/connection');
var pool = connection.pool;

module.exports = {

    tryLogin: function (req, res) {

        var sess = req.session;

        var username = req.body.username;
        var password = req.body.password;

        pool.query({sql: 'SELECT * from user where username = ? AND password = ?', timeout:500}
            ,[username, password], function(err, rows, fields) {

            if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                throw new Error('fetch timed out!');
            }

            if (rows.length != 1) {
                return res.json({sessid: null,
                    signature: 'error'});
            }

            sess.userid = rows[0].iduser;
            sess.secondFactor = false;

            return res.json({userid: sess.userid,
                secondFactor: false,
                signature: 'ok'});

        });

    },

    logout: function (req, res) {
        req.session.destroy();

        return res.json({signature: 'ok'});
    }
};