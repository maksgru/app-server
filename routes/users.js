const multer = require('multer');
const validator = require('../validators');
const controller = require('../controllers/users');

const upload = multer({ dest: 'upload' });

module.exports = router => {
  /**
 * @swagger
 * /api/users:
 *  get:
 *    description: Get users
 *    responses:
 *       200:
 *         description: Users list
 */
  router.get('/', controller.getUsers);

  /**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    description: Get user by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type : integer
 *    responses:
 *       200:
 *         description: User
 */
  router.get('/:id', validator.users.getOne, controller.getOneUser);

  /**
 *
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type : integer
 *       - in: formData
 *         name: avatar
 *         type: file
 *         description: The file to upload.
 *     responses:
 *       200:
 *         description: success
 */
  router.patch('/:id', upload.single('avatar'), controller.updateUser);
};
