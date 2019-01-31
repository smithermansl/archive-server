const { Category, Entry, Guest, Neighborhood } = require('../db');

module.exports = async () => {
  // getting entries
  const superTaste = await Entry.findByPk(1);
  const leos = await Entry.findByPk(2);
  const hanoi = await Entry.findByPk(3);

  // getting categories
  const vietnamese = await Category.findByPk(1);
  const chinese = await Category.findByPk(2);
  const breakfast = await Category.findByPk(35);
  const bagels = await Category.findByPk(36);

  // getting guests
  const peggy = await Guest.findByPk(1);
  const mom = await Guest.findByPk(2);
  const atom = await Guest.findByPk(3);
  const ry = await Guest.findByPk(4);
  const ash = await Guest.findByPk(5);

  // getting neighborhoods
  const fidi = await Neighborhood.findByPk(13);
  const chinatown = await Neighborhood.findByPk(15);
  const village = await Neighborhood.findByPk(22);

  // set entry categories
  await superTaste.setCategories([chinese]);
  await leos.setCategories([bagels, breakfast]);
  await hanoi.setCategories([vietnamese]);

  // set entry guests
  await superTaste.setGuests([ash, atom, ry]);
  await leos.setGuests([mom, peggy]);
  await hanoi.setGuests([ry, peggy, ash]);

  // set entry neighborhood
  await superTaste.setNeighborhood(chinatown);
  await hanoi.setNeighborhood(village);
  await leos.setNeighborhood(fidi);
};