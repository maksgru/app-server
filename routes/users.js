const controller = require('../controllers/users');

module.exports = router => {
  router.get('/', controller.getUsers);
  router.get('/:id', controller.getOneUser);
};
