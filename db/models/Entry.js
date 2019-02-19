const db = require('../database');
const Sequelize = require('sequelize');

const Entry = db.define('entries', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.SMALLINT,
    validate: {
      min: 0,
      max: 5
    }
  },
  price: {
    type: Sequelize.SMALLINT,
    validate: {
      min: 1,
      max: 5
    }
  },
  notes: {
    type: Sequelize.TEXT
  },
  is_favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  lat: {
    type: Sequelize.DECIMAL,
    validate: {
      isDecimal: true
    }
  },
  long : {
    type: Sequelize.DECIMAL,
    validate: {
      isDecimal: true
    }
  },
  address: {
    type: Sequelize.STRING
  }
});

module.exports = Entry;
