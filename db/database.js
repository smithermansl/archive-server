'use strict';

// establish connection to PG database

const Sequelize = require('sequelize');
const localDb = 'postgres://localhost:5432/archive';

const db = new Sequelize(process.env.DATABASE_URL || localDb, { logging: false });

module.exports = db;
