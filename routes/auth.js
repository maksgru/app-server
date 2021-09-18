const controller = require('../controllers/auth');
const validate = require('../validators');
const { signUp, signIn } = require('../validators/auth');

module.exports = router => {
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
  router.post('/sign-up', validate(signUp), controller.signUp);

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
  router.post('/sign-in', validate(signIn), controller.signIn);
};
