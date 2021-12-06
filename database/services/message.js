const { Op } = require('sequelize');
const db = require('../models');

module.exports = {
  create: (params) => db.message.create(params),
  findMessages: ({ userId, offset, limit }) => db.message.findAll({
    where: { [Op.or]: [{ authorId: userId }, { receiverId: userId }] },
    order: [['id', 'desc']],
    offset,
    limit
  })
};
