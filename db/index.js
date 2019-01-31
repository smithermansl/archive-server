'use strict';

const db = require('./database');

const Category = require('./models/Category');
const Entry = require('./models/Entry');
const Guest = require('./models/Guest');
const Neighborhood = require('./models/Neighborhood');

// write associations here

module.exports = { db, Category, Entry, Guest, Neighborhood };
