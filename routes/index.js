const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/store', require('./store'));
router.use('/inventory', require('./inventory'));

module.exports = router;