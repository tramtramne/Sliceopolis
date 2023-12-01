const router = require('express').Router();
const storeController = require('../controllers/store.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { verifyToken, checkRoles } = require('../middlewares/authorization');

router.get(
    '/stores',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN'])),
    asyncHandler(storeController.getStores),
);
module.exports = router;
