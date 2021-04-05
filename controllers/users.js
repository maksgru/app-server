const userService = require('../database/services/user');

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
const getOneUser = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const user = await userService.findOneUser({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw { status: 404, message: 'User not found.' };
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/users:
 *  get:
 *    description: Get users
 *    responses:
 *       200:
 *         description: Users list
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

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
const updateUser = async (req, res, next) => {
  try {
    const avatar = req.file;
    return res.json(avatar);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOneUser,
  getUsers,
  updateUser
};
