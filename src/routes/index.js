const router = require('express').Router();
const homeRouter = require('./home.router');

router.use('/api', homeRouter);

module.exports = router;