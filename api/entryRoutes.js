'use strict';

const router = require('express').Router();
const axios = require('axios');
if (process.env.NODE_ENV !== 'production') require('../secrets');
const { Category, Entry, Guest, Neighborhood, User } = require('../db');

// TODO:
// decide if I need get single entry route
// only if to get more specifics about entry than in bulk get
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

// uses text input formated with %20s, returns array of "candidates"
// candidates are objects w/ address, latitude, longitude of places that match string
router.get('/entry/:input', async (req, res, next) => {
  // expects input to already be formated with %20 instead of spaces
  const { input } = req.params;
  let textInput = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.GOOGLE_KEY}`;

  const { data } = await axios.get(textInput);
  res.status(200).json(data.candidates);

  /*

    returns object
    with key candidates that is an array
    of objects containing these keys:
      - formated address
      - name
      - geometry
        - location
          - lat
          - lng

  */
});


// GET request to mapbox API for neighborhood, uses longitude and latitude
// returns name of neighborhood as string, or null if not found
router.get('/entry/:long/:lat', async (req, res, next) => {
  try {
    const { long, lat } = req.params;
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=neighborhood&access_token=${process.env.MAPBOX_TOKEN}`);
    const name = data.features[0].text || null;

    res.status(200).json(name);
  } catch(err) {
    next(err);
  }
});


// posting a new entry
// expects categoryIds && guestIds to be arrays
router.post('/', async (req, res, next) => {
  // TODO: set neighborhood, lat, long
  try {
    const { categoryIds, guestIds, is_favorite, lat, long, name,
      neighborhoodName, notes, price, rating, userId } = req.body;

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
