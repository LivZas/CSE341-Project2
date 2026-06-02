const router = require('express').Router();
const passport = require('passport');

router.use('/api-docs', require('./swagger'));

router.use('/store', require('./store'));
router.use('/inventory', require('./inventory'));

router.get('/login', passport.authenticate('github'));

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;