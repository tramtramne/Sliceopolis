const router = require('express').Router();
const authRouter = require('./auth.router');

router.use('/api', authRouter);

module.exports = router;