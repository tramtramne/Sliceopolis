const store = require('../models/Store');

class Store {
    async getStore() {
        const stores = await Store.find();
        return stores;
    }
}
