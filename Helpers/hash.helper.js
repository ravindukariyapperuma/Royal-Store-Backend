const bcrypt = require("bcrypt");

module.exports = {
  generateHash: (Plaintext, saltRounds) => {
    const hash = bcrypt.hashSync(Plaintext, saltRounds);
    return hash;
  },

  compareHash: (PlaintextPassword, hash) => {
    const match = bcrypt.compareSync(PlaintextPassword, hash);
    return match;
  },
};
