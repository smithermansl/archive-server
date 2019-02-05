const db = require('../database');
const Sequelize = require('sequelize');
const crypto = require('crypto');

const User = db.define('users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    isEmail: true
  },
  password: {
    type: Sequelize.STRING,
    // disguises password as function when serialized to JSON
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    // disguises salt as function when serialized to JSON
    get() {
      return () => this.getDataValue('salt');
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
});

module.exports = User;


// CLASS METHODS

// generate random user salt
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  // create hash with SHA256
  // update hash with entered plainText and user salt
  // calc digest of data passed to hash,
  // hex encoding is provided so string will be returned

  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};


// INSTANCE METHODS

// check password entered against saved user pw
User.prototype.correctPassword = function(pwEntered) {
  return User.encryptPassword(pwEntered, this.salt()) === this.password();
};


// HOOKS

const setPasswordAndSalt = user => {
  // changed method returns bool indicating whether value of that key in dataValues
  // is equal to value of that key in _previousDataValues

  if (user.changed('password')) {
    // store new salt and encrypted version of pw
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  };
};


User.beforeCreate(setPasswordAndSalt);
User.beforeUpdate(setPasswordAndSalt);
