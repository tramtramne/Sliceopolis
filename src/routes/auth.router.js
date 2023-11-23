const router = require('express').Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { register, login } = require('../controllers/auth.controller');

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

module.exports = router;
