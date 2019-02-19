'use strict';

const db = require('./database');

const Category = require('./models/Category');
const Entry = require('./models/Entry');
const Guest = require('./models/Guest');
const Neighborhood = require('./models/Neighborhood');
const User = require('./models/User');

// associations
Entry.belongsTo(User);
User.hasMany(Entry);

Guest.belongsTo(User);
User.hasMany(Guest);

Entry.belongsTo(Neighborhood);
Neighborhood.hasMany(Entry);

Entry.belongsToMany(Guest, { through: 'EntryGuest' });
Guest.belongsToMany(Entry, { through: 'EntryGuest' });

Category.belongsToMany(Entry, { through: 'EntryCategory' });
Entry.belongsToMany(Category, { through: 'EntryCategory' });

module.exports = { db, Category, Entry, Guest, Neighborhood, User };
