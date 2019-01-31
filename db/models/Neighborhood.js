const db = require('../database');
const Sequelize = require('sequelize');

const Neighborhood = db.define('neighborhoods', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Neighborhood;
