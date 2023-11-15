const router = require('express').Router();
const authRouter = require('./auth.router');
const orderRouter = require('./order.router');

router.use('/api', authRouter);
router.use('/api', orderRouter);

module.exports = router;