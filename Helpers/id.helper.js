const { v4: uuidv4, validate: uuidValidate } = require("uuid");

module.exports = {
  generateUUID: () => {
    const id = uuidv4();
    return id;
  },

  validateUUID: (id) => {
    const validate = uuidValidate(id);
    return validate;
  },
};
