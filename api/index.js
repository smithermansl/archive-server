'use strict';

const router = require('express').Router();

router.use('/categories', require('./categoryRoutes'));
router.use('/location', require('./locationRoutes'));
router.use('/users', require('./userRoutes'));

module.exports = router;