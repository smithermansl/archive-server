'use strict';

const router = require('express').Router();

router.use('/entry', require('./entryRoutes'));
router.use('/guest', require('./guestRoutes'));

module.exports = router;
