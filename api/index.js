'use strict';

const router = require('express').Router();

router.use('/entries', require('./entryRoutes'));
router.use('/guests', require('./guestRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/location', require('./locationRoutes'));

module.exports = router;
