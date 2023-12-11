const store = require('../models/Store');
class Store {
    async getStore() {
        const stores = await store.find();
        return stores;
    }
}

module.exports = new Store();
