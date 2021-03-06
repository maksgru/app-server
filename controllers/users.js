const userService = require('../database/services/user');

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

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

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
