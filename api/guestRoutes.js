'use strict';

const router = require('express').Router({ mergeParams: true });
const { Category, Entry, Guest, User } = require('../db');

// get all guests for a specific user
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const guests = await Guest.findAll({
      where: { userId }
    });

    res.status(200).json(guests);
  } catch(err) {
    next(err);
  }
});

// get all info for specific guest (eager load entries, categories of those entries)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByPk(id, {
      include: [
        { model: Entry,
          attributes: ['name', 'rating', 'price', 'id'],
          through: { attributes: []},
          include: [{
            model: Category,
            attributes: ['name', 'id'],
            through: { attributes: []}
          }]
        }
      ]
    });

    res.status(200).json(guest);
  } catch(err) {
    next(err);
  }
});

// create new guest
router.post('/', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    const newGuest = await Guest.create({ firstName, lastName });
    const user = await User.findByPk(userId);
    user.setGuest(newGuest);

    res.status(201).json(newGuest);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
