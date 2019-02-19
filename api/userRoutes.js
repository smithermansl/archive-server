'use strict';

const router = require('express').Router();
const { User } = require('../db');

router.use('/:userId/entries', require('./entryRoutes'));
router.use('/:userId/guests', require('./guestRoutes'));

// get all users (admin purposes)
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
