const voucherModel = require('../models/Voucher');

class Voucher {
    async getAllVoucher() {
        const data = await productModel.find({});
        return data;
    }
    async getVoucherById(id) {
        const data = await voucherModel.findById(id).exec();
        return data;
    }
}
module.exports = new Voucher();
