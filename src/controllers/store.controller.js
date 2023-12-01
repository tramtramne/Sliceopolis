const storeService = require('../services/store.service');
const { SuccessResponse } = require('../common/success.response');
const getStores = async (req, res) => {
    const stores = await storeService.getStore();
    return new SuccessResponse({
        metadata: stores,
    }).send({ res });
};

module.exports({
    getStores,
});
