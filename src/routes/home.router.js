module.exports = function (router) {
    const models = require('../controllers/models.controller');
    var homeController = require('../controllers/home.controller');

    router.get('/', homeController.home);

    router.get('/about', homeController.about);
};
