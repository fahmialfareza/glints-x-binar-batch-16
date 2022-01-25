//! import bcrypt 

const bcrypt = require('bcrypt');

function hashPassword (password) {
  //! membawa parameter password dan salt 
  const hash = bcrypt.hashSync(password,10);
  return hash;
}

function comparePassword (password,hash) {
  //! compare pass yg telah di input dg hash pass dlm db
  const compare = bcrypt.compareSync(password,hash);
  return compare;
}

module.exports = {
  hashPassword,
  comparePassword
}