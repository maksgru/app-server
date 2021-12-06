const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');

const bot = new TelegramBot(config.telegram.botToken);
bot.setWebHook(config.telegram.webHookUrl);
module.exports = {
  sendMessageToBot: (message) => bot.sendMessage(config.telegram.chatId, message, { parse_mode: 'HTML' })
};
