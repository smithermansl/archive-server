'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
// const { db } = require('./db');

const app = express();

// logging
app.use(morgan('dev'));

// body parsing
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.use('/api', require('./api'))

app.use((err, req, res) => {
  console.log(err)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(port, () => console.log(`Server started on port: ${port}`))
