const TelegramBot = require('node-telegram-bot-api');
const messageService = require('../database/services/message');
const userService = require('../database/services/user');
const config = require('../config');
const { NEW_CHAT_MESSAGE_SERVER } = require('../sockets/eventNames');
const { sendMessageToBot } = require('../utils/telegramBot');
const { TELEGRAM_BOT_ID, IO } = require('../utils/constants');

const bot = new TelegramBot(config.telegram.botToken);

const newMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { user } = req;
    const telegramBotId = req.app.get(TELEGRAM_BOT_ID);
    const messageData = `
      <b>((${user.id}))</b>\n
      ${text}
    `;
    const params = {
      text,
      authorId: user.id,
      receiverId: telegramBotId
    };
    const message = await messageService.create(params);
    bot.sendMessage(config.telegram.chatId, messageData, { parse_mode: 'HTML' });
    return res.json({ message, userId: user.id });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      return res.json({ messages: [] });
    }
    const { offset = 0, limit = 10 } = req.query;
    const query = {
      userId: user.id,
      offset,
      limit
    };
    const messages = await messageService.findMessages(query);
    res.json({ messages, userId: user.id });
  } catch (error) {
    next(error);
  }
};

const telegramWebHook = async (req, res, next) => {
  try {
    const messageData = req.body.message;
    const replyData = messageData.reply_to_message;
    if (!replyData) {
      sendMessageToBot('Ooops... something went wrong...');
      return res.sendStatus(200);
    }
    const [, id] = replyData.text.match(/\(\((\d+)\)\)/) || [null, null];
    if (!id) {
      sendMessageToBot('Ooops... something went wrong...');
      return res.sendStatus(200);
    }
    const io = req.app.get(IO);
    const telegramBotId = req.app.get(TELEGRAM_BOT_ID);
    const user = await userService.findById(id);
    if (!user) {
      sendMessageToBot(`user id - ${id} not found`);
      return res.sendStatus(200);
    }
    const params = {
      text: messageData.text,
      authorId: telegramBotId,
      receiverId: user.id
    };
    const message = await messageService.create(params);
    const socketId = user.device.socketId;
    io.to(socketId).emit(NEW_CHAT_MESSAGE_SERVER, message.toJSON());
    return res.sendStatus(200);
  } catch (error) {
    res.sendStatus(200);
    next(error);
  }
};

module.exports = {
  newMessage,
  getMessages,
  telegramWebHook
};
