'use strict';

const router = require('express').Router();
const axios = require('axios');
if (process.env.NODE_ENV !== 'production') require('../secrets');

router.get('/entry/:input', async (req, res, next) => {
  // expects input to already be formated with %20 instead of spaces
  const { input } = req.params;
  let textInput = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.GOOGLE_KEY}`;

  const { data } = await axios.get(textInput);
  res.status(200).json(data);

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

module.exports = router;
