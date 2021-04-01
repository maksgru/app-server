const controller = require('../controllers/auth');
const validate = require('../validators');
const { signUp, signIn } = require('../validators/auth');

module.exports = router => {
  router.post('/sign-up', validate(signUp), controller.signUp);
  router.post('/sign-in', validate(signIn), controller.signIn);
};
