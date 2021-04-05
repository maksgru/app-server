const multer = require('multer');
const controller = require('../controllers/users');

const upload = multer({ dest: 'upload' });

module.exports = router => {
  router.get('/', controller.getUsers);
  router.get('/:id', controller.getOneUser);
  router.patch('/:id', upload.single('avatar'), controller.updateUser);
};
