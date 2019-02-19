'use strict'

const axios = require('axios');
const router = require('express').Router();
if (process.env.NODE_ENV !== 'production') require('../secrets');

// get location info
router.get('/places/:input', async (req, res, next) => {
  const { input } = req.params;
  let textInput = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.GOOGLE_KEY}`;

  const { data } = await axios.get(textInput);
  res.status(200).json(data.candidates);

  /*
    returns object
    with key candidates that is an array
    of objects that match input string
    containing these keys:
      - formated address
      - name
      - geometry
        - location
          - lat
          - lng
  */
});

// get neighborhood info w/ long & lat
router.get('/neighborhood/:long/:lat', async (req, res, next) => {
  try {
    const { long, lat } = req.params;
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=neighborhood&access_token=${process.env.MAPBOX_TOKEN}`);
    const name = data.features[0].text || null;

    res.status(200).json(name);
  } catch(err) {
    next(err);
  }
});

module.exports = router;