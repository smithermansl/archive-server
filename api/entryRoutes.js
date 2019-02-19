'use strict';

const router = require('express').Router();
const { Category, Entry, Guest, Neighborhood, User } = require('../db');

// TODO:
// decide if I need get single entry route
// only if to get more specifics about entry than in bulk get

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

// posting a new entry
// expects categoryIds && guestIds to be arrays

router.post('/', async (req, res, next) => {
  // TODO: set neighborhood, lat, long

  const { categoryIds, guestIds, is_favorite, lat, long, name, notes, price, rating, userId } = req.body;
  try {
    const newEntry = await Entry.create({
      name,
      rating,
      price,
      notes,
      is_favorite,
      lat,
      long
    });

    let categories = [];
    for (let i = 0; i < categoryIds.length; i++) {
      let cat = await Category.findByPk(categoryIds[i]);
      categories.push(cat);
    }

    let guests = [];
    for (let i = 0; i < guestIds.length; i++) {
      let guest = await Guest.findByPk(guestIds[i]);
      guests.push(guest);
    }

    const creator = await User.findByPk(userId);

    await newEntry.setCategories(categories);
    await newEntry.setGuests(guests);
    await newEntry.setUser(creator);

    res.status(201).json(newEntry);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
