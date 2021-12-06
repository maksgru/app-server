const db = require('../models');
const { USER_FIELDS_EXCLUDE } = require('../../utils/constants');

module.exports = {
  findRawUser: (query = {}) => db.user.findOne({
    ...query
  }),
  findByEmail: (email) => db.user.findOne({
    where: { email }
  }),
  findById: (id) => db.user.findOne({
    where: { id },
    include: [{ model: db.device }]
  }),
  createUnknown: async ({ hash, socketId }) => {
    const user = await db.user.create({
      role: 'unknown'
    });

    const device = await db.device.create({ userId: user.id, hash, socketId });
    user.device = device;
    return user;
  },
  findOne: id => db.user.findOne({
    where: { id },
    attributes: {
      exclude: USER_FIELDS_EXCLUDE
    }
  }),
  findAndUpdateHash: async ({ id, hash, socketId }) => {
    const user = await db.user.findOne({
      where: { id },
      include: [{ model: db.device }]
    });
    if (!user.device || user.device.socketId !== socketId) {
      const [device, created] = await db.device.findOrCreate({
        where: { userId: id },
        defaults: { hash, socketId }
      });
      if (!created || device.hash !== hash) {
        device.hash = hash;
        device.socketId = socketId;
        await device.save();
      }
    }
    return user;
  },
  verifyUser: (query = {}) => db.user.findOne(query),
  findUsers: (query = {}) => db.user.findAll({
    ...query,
    attributes: {
      exclude: USER_FIELDS_EXCLUDE
    }
  }),
  create: params => db.user.create(params),
  findOrCreate: params => db.user.findOrCreate(params),
  updateUser: (payload, query = {}) => db.user.update(payload, {
    returning: true,
    ...query
  }),
  updateSocketSession: ({ userId, socketId, hash }) => db.device.update(
    { userId, socketId, hash },
    { where: { hash } }
  ),
  createAddDevice: (params) => db.device.create(params),
  deleteUser: params => db.user.destroy(params)
};
