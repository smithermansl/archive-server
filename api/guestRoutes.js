'use strict';

const router = require('express').Router();
const { Entry, Guest } = require('../db');

// get all info for specific guest (eager load entries, categories of those entries)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByPk(id, {
      include: [
        { model: Entry }
      ]
    });

    res.status(200).json(guest);
  } catch(err) {
    next(err);
  }
})

// create new guest
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const newGuest = await Guest.create({ firstName, lastName });

    res.status(201).json(newGuest);
  } catch(err) {
    next(err);
  }
})

module.exports = router;
