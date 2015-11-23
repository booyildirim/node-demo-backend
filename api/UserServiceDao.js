/**
 * Created by yildirimb on 22/10/2015.
 */

/**
 * UserServiceDao.js
 *
 * @description :: Server-side logic for managing users.
 */

var connection = require('../db/connection');
var pool = connection.pool;

var User = require('../schema/userschema');

module.exports = {

    /**
     * USerServiceDao.create()
     */
    create: function (req, res) {

        var user = req.body;

        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query({sql: 'INSERT into user SET ? ', timeout:500} ,user, function(err, rows, fields) {

                if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                    throw new Error('create timed out!');
                }

                return res.json({
                    sucess: true
                });

            });

        });

    },

    /**
     * USerServiceDao.delete()
     */
    delete: function (req, res) {

        var id = req.body.id;

        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query({sql: 'DELETE from user where iduser = ?', timeout:500} ,[id], function (err, result) {

                if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                    throw new Error('delete timed out!');
                }
                connection.release();

                if (typeof result === 'undefined') {
                    return res.json({
                        sucess: false
                    });
                }

                if (result.affectedRows !== 1) {
                    return res.json({
                        sucess: false
                    });
                }
                return res.json({
                    sucess: true
                });

            });

        });

    },

    /**
     * USerServiceDao.update()
     */
    update: function (req, res) {

        var id = req.body.id;
        var userUpdated = req.body.user;

        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query({sql: 'UPDATE user SET ? WHERE iduser = ?', timeout:500} ,[userUpdated, id], function (err, result) {

                if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                    throw new Error('update timed out!');
                }
                connection.release();

                if (typeof result === 'undefined') {
                    return res.json({
                        sucess: false
                    });
                }

                if (result.affectedRows !== 1) {
                    return res.json({
                        sucess: false
                    });
                }
                return res.json({
                    sucess: true
                });

            });

        });

    },

    getFromSession: function (req, res) {

        var userId = req.session.userid;
        var secondFactor = req.session.secondFactor;

        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query({sql: 'SELECT * from user where iduser = ?', timeout:500} ,[userId], function(err, rows, fields) {

                if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
                    throw new Error('fetch timed out!');
                }

                connection.release();

                if (rows.length != 1) {
                    return res.json({user: null,
                        signature: 'session expired'});
                }

                if (secondFactor !== true) {
                    return res.json({user: null,
                        signature: 'session expired'});
                }
                // create a user from pre defined schema!
                var user = new User(rows[0]);

                return res.json({user: user,
                    signature: 'ok'});


            });

        });
    }
};
