'use strict';

const router = require('express').Router({ mergeParams: true });
const { Category, Entry, Guest, Neighborhood, User } = require('../db');

// get all entries for a specific user, eager loads categories/neighborhood
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const entries = await Entry.findAll({
      where: { userId },
      attributes: ['id', 'name', 'rating', 'price', 'notes', 'is_favorite'],
      include: [{
        model: Category,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      },
      {
        model: Neighborhood,
        attributes: ['id', 'name']
      }]
    });

    res.status(200).json(entries);
  } catch(err) {
    next(err);
  }
});

// posting a new entry for a user
// expects categoryIds && guestIds to be arrays
router.post('/', async (req, res, next) => {
  // TODO: set neighborhood, lat, long
  try {
    const { userId } = req.params;
    const { categoryIds, guestIds, is_favorite, lat, long,
      name, neighborhoodName, notes, price, rating } = req.body;

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
    await newEntry.setCategories(categories);

    let guests = [];
    for (let i = 0; i < guestIds.length; i++) {
      let guest = await Guest.findByPk(guestIds[i]);
      guests.push(guest);
    }
    await newEntry.setGuests(guests);

    const creator = await User.findByPk(userId);
    await newEntry.setUser(creator);

    const neighborhood = await Neighborhood.findOrCreate({
      where: {
        name: neighborhoodName
      }
    });
    await newEntry.setNeighborhood(neighborhood);

    res.status(201).json(newEntry);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
