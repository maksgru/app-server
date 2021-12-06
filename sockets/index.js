const userService = require('../database/services/user');
const messageService = require('../database/services/message');
const { sendMessageToBot } = require('../utils/telegramBot');
const { NEW_CHAT_MESSAGE_CLIENT } = require('./eventNames');
const { TELEGRAM_BOT_ID } = require('../utils/constants');

module.exports = (io, app) => {
  io.use(async (socket, next) => {
    const socketId = socket.id;
    const { userId, deviceHash: hash } = socket.handshake.query;
    if (userId) {
      await userService.findAndUpdateHash({ id: userId, hash, socketId });
    }
    next();
  });
  io.on('connection', (socket) => {
    const socketId = socket.id;
    socket.on(NEW_CHAT_MESSAGE_CLIENT, async (text, responseCallBack) => {
      const { deviceHash, userId, unknownUser } = socket.handshake.query;
      let user;
      if (unknownUser) {
        user = await userService.createUnknown({ hash: deviceHash, socketId });
      }
      if (userId) {
        user = await userService.findAndUpdateHash({ id: userId, hash: deviceHash, socketId });
      }
      const telegramBotId = app.get(TELEGRAM_BOT_ID);
      const message = `
        <b>((${user.id}))</b>\n
        ${text}
      `;
      const params = {
        text,
        authorId: user.id,
        receiverId: telegramBotId
      };
      let msg = await messageService.create(params);
      sendMessageToBot(message);
      msg = msg.toJSON();
      responseCallBack(msg);
    });
    socket.on('disconnect', () => {
    });
  });
};
