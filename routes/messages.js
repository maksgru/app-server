const controller = require('../controllers/messages');
const checkDeviceHash = require('../middlewares/checkDeviceHash');
const validator = require('../validators');

module.exports = (router) => {
  router.post('/', checkDeviceHash, controller.newMessage);
  router.get('/', validator.messages.getAll, checkDeviceHash, controller.getMessages);
  router.post('/tlgrm-hook', controller.telegramWebHook);
};

