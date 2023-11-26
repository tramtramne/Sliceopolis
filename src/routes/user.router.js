const router = require('express').Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { verifyToken } = require('../middlewares/authorization');
const userController = require('../controllers/user.controller');
const { checkRoles } = require('../middlewares/authorization');
router.get('/me', asyncHandler(verifyToken), asyncHandler(userController.getProfile));
router.put('/editProfile', asyncHandler(verifyToken), asyncHandler(userController.editProfile));
router.get('/viewHistoryOrder', asyncHandler(verifyToken), asyncHandler(userController.viewOrderHistory));

//

//Admin, Staff
router.get(
    '/getAllUser',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN', 'STAFF'])),
    asyncHandler(userController.getAllUser),
);

module.exports = router;
