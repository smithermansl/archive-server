const db = require('../database');
const Sequelize = require('sequelize');

const Entry = db.define('entries', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.TINYINT,
    validate: {
      min: 0,
      max: 5
    }
  },
  price: {
    type: SEquelize.TINYINT,
    validate: {
      min: 1,
      max: 5
    }
  },
  notes: {
    type: Sequelize.TEXT
  },
  is_favorite: {
    type: SEquelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Entry;
