const { Category, Entry, Guest, Neighborhood, User } = require('../db');

module.exports = async () => {
  // getting users
  const shelby = await User.findByPk(1);
  const stev = await User.findByPk(2);
  const test = await User.findByPk(3);

  // getting entries
  const superTaste = await Entry.findByPk(1);
  const leos = await Entry.findByPk(2);
  const hanoi = await Entry.findByPk(3);
  const cheers = await Entry.findByPk(4);

  // getting categories
  const vietnamese = await Category.findByPk(1);
  const chinese = await Category.findByPk(2);
  const breakfast = await Category.findByPk(35);
  const bagels = await Category.findByPk(36);
  const thai = await Category.findByPk(26);

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
  const williamsburg = await Neighborhood.findByPk(24);

  // set which entries belong to a user
  await shelby.setEntries([leos, superTaste]);
  await stev.setEntries([hanoi]);
  await test.setEntries([cheers]);

  // set entry categories
  await superTaste.setCategories([chinese]);
  await leos.setCategories([bagels, breakfast]);
  await hanoi.setCategories([vietnamese]);
  await cheers.setCategories([thai]);

  // set entry guests
  await superTaste.setGuests([ash, atom, ry]);
  await leos.setGuests([mom, peggy]);
  await hanoi.setGuests([ry, peggy, ash]);
  await cheers.setGuests([atom, ry]);

  // set entry neighborhood
  await superTaste.setNeighborhood(chinatown);
  await hanoi.setNeighborhood(village);
  await leos.setNeighborhood(fidi);
  await cheers.setNeighborhood(williamsburg);
};