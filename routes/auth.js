const controller = require('../controllers/auth');
const isAuthorized = require('../middlewares/isAuthorized');
const validator = require('../validators');

module.exports = router => {
  router.get('/', isAuthorized, controller.authorize);
  /**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         schema:
 *           type: object
 *           required:
 *           - email
 *           - password
 *           - firstName
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *     responses:
 *       200:
 *         description: sign up
 */
  router.post('/sign-up', validator.auth.signUp, controller.signUp);

  /**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         schema:
 *           type: "object"
 *           required:
 *           - email
 *           - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: sms code expiration
 */
  router.post('/sign-in', validator.auth.signIn, controller.signIn);
  router.post('/google-sign-in', controller.googleSignIn);
};
