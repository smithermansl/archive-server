'use strict';

const router = require('express').Router();
const { Category, Entry, Guest } = require('../db');

// get all entries (eager load categories)
router.get('/', async (req, res, next) => {
  try {
    const allEntries = await Entry.findAll();

    res.status(200).json(allEntries);
  } catch (err) {
    next(err);
  }
});

// get a single entry (eager loads its categories and guests)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = await Entry.findByPk(id, {
      include: [ Category, Guest ]
    });

    res.status(200).json(entry);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
