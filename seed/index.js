const { db, Category, Entry, Guest, Neighborhood } = require('../db');

const categories = require('./categoryContent');
const entries = require('./entryContent');
const guests = require('./guestContent');
const neighborhoods = require('./neighborhoodContent');
const seedJoins = require('./seedJoins');

const seed = async () => {
  await Promise.all(categories.map(category => Category.create(category)));
  await Promise.all(entries.map(entry => Entry.create(entry)));
  await Promise.all(guests.map(guest => Guest.create(guest)));
  await Promise.all(neighborhoods.map(hood => Neighborhood.create(hood)));
};

const main = () => {
  console.log('Attempting to sync database.');

  db.sync( {force: true} )
    .then(() => {
      console.log('Seeding tables.');
      return seed();
    })
    .catch(err => console.log('Error seeding db tables.', err.message))
    .then(() => {
      console.log('Seeding join tables.');
      return seedJoins();
    })
    .catch(err => console.log('Error seeding join tables.', err.message))
    .then(() => {
      db.close();
      return null;
    });
};

main();
