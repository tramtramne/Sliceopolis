const router = require('express').Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { verifyToken } = require('../middlewares/authorization');
const userController = require('../controllers/user.controller');
router.get('/me', asyncHandler(verifyToken), asyncHandler(userController.getProfile));
router.put('/editProfile', asyncHandler(verifyToken), asyncHandler(userController.editProfile));
module.exports = router;
