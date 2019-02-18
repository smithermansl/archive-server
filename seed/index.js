const { db, Category, Entry, Guest, Neighborhood, User } = require('../db');

const categories = require('./categoryContent');
const entries = require('./entryContent');
const guests = require('./guestContent');
const neighborhoods = require('./neighborhoodContent');
const users = require('./userContent');

// import function for seeding db join tables
const seedJoinTables = require('./seedJoinTables');

const seed = async () => {
  await Promise.all(categories.map(category => Category.create(category)));
  await Promise.all(entries.map(entry => Entry.create(entry)));
  await Promise.all(guests.map(guest => Guest.create(guest)));
  await Promise.all(neighborhoods.map(hood => Neighborhood.create(hood)));
  await Promise.all(users.map(user => User.create(user)));
};

const main = () => {
  console.log('Attempting to sync database.');

  db.sync( {force: true} )
    .then(() => {
      console.log('Seeding tables.');
      return seed();
    })
    .catch(err => console.log('Error seeding main tables.', err.message))
    .then(() => {
      console.log('Seeding join tables.');
      return seedJoinTables();
    })
    .catch(err => console.log('Error seeding join tables.', err.message))
    .then(() => {
      db.close();
      return null;
    });
};

main();
