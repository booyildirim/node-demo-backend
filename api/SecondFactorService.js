var speakeasy = require('../node_modules/speakeasy');

// hmac creation of token, time based totp is also avaliable
var token = speakeasy.hotp({key: 'secret', counter: 9999, length: 4});
console.log(token);

module.exports = {

    sendSms: function (req, res) {
        var sess = req.session;
        sess.smsSent = true;
        sess.token = token;

        return res.json({signature: 'ok'});
    },
    secondFactorLogin: function (req, res) {
        var sess = req.session;

        if (sess.smsSent !== true) {
            return res.json({signature: 'session expired'});
        }

        if (sess.token == req.body.otp) {
            sess.secondFactor = true;
            return res.json({signature: 'ok'});
        }

    }
}
