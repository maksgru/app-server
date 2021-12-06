const db = require('../database/models');
const { TELEGRAM_BOT_ID } = require('./constants');

module.exports = async (app) => {
  const defaults = {
    firstName: 'Bot',
    email: 'bot@admin.com'
  };
  const [telegramBot] = await db.user.findOrCreate({
    where: { email: defaults.email },
    defaults
  });
  app.set(TELEGRAM_BOT_ID, telegramBot.id);
};
