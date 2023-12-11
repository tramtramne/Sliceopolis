const router = require('express').Router();
const { getStores } = require('../controllers/store.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { verifyToken, checkRoles } = require('../middlewares/authorization');

router.get('/', asyncHandler(verifyToken), asyncHandler(checkRoles(['ADMIN'])), asyncHandler(getStores));
module.exports = router;
