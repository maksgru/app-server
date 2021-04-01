const db = require('../models');
const { USER_FIELDS_EXCLUDE } = require('../../utils/constants');

module.exports = {
  findOneUser: (query = {}) => db.user.findOne({
    ...query,
    attributes: {
      exclude: USER_FIELDS_EXCLUDE
    }
  }),
  verifyUser: (query = {}) => db.user.findOne(query),
  findUsers: (query = {}) => db.user.findAll({
    ...query,
    attributes: {
      exclude: USER_FIELDS_EXCLUDE
    }
  }),
  findOrCreate: params => db.user.findOrCreate(params),
  updateUser: (payload, query = {}) => db.user.update(payload, {
    returning: true,
    ...query
  }),
  deleteUser: params => db.user.destroy(params)
};
