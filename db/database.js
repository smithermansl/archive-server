'use strict';

// establish connection to PG database

const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/archive', {
  logging: false
});

module.exports = db;
