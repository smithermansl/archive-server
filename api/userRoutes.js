'use strict';

const router = require('express').Router();
const { Category, Entry, Guest, Neighborhood, User } = require('../db');

router.get('/:userId/entries', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const entries = await Entry.findAll({
      where: { userId },
      include: [ Category, Guest, Neighborhood ]
    });

    res.status(200).json(entries);
  } catch(err) {
    next(err);
  }
});

router.get('/:userId/guests', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const guests = await Guest.findAll({
      where: { userId }
    })

    res.status(200).json(guests);
  } catch(err) {
    next(err);
  }
})

module.exports = router;
