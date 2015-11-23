var app = require('express');
var router = app.Router();
var session = require('express-session');

router.use(session({secret: 's3cr3tt0k3n'}));


var user_service = require('../api/UserServiceDao');
var login_service = require('../api/LoginService');
var secondfactor_service = require('../api/SecondFactorService')

router.get('/user', function(req, res, next) {
    user_service.getFromSession(req, res);
});

/* create a new user */
router.put('/user', function (req, res) {
    user_service.create(req, res);
});

/* delete a user */
router.delete('/user', function (req, res) {
    user_service.delete(req, res);
});

router.post('/user/update', function (req, res) {
    user_service.update(req, res);
});

router.post('/login', function (req, res) {
    login_service.tryLogin(req, res);
});

router.post('/logout', function (req, res) {
    login_service.logout(req, res);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'DemoServices'});
});

// send sms
router.post('/sms', function (req, res) {
    secondfactor_service.sendSms(req, res);
});

// login second factor
router.post('/secondFactor', function (req, res) {
    secondfactor_service.secondFactorLogin(req, res);
});

module.exports = router;
