'use strict';

const router = require('express').Router();
const { Category, Entry, Guest, Neighborhood } = require('../db');

// TODO
// possibly don't need (I can filter on front end by entry ID)

// get a single entry (eager loads its categories, guests, neighborhood)
router.get('/:entryId', async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const entry = await Entry.findByPk(entryId, {
      include: [ Category, Guest, Neighborhood ]
    });

    res.status(200).json(entry);
  } catch(err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  // will need to get the neighborhood and categories as well
  const { name, rating, price, notes, is_favorite } = req.body;
  try {
    const newEntry = await Entry.create({
      name,
      rating,
      price,
      notes,
      is_favorite
    });

    res.status(201).json(newEntry);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
