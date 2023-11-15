const voucherModel = require('../models/Voucher');

class Voucher {
    // getAllVoucher = async () => {
    //     try {
    //         const data = await productModel.find({});
    //         return data;
    //     } catch (error) {
    //         console.error('Error retrieving data:', error);
    //         throw error;
    //     }
    // };
    getVoucherById = async (id) => {
        try {
            const data = await voucherModel.findById(id).exec();
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        }
    };
}
module.exports = new Voucher();
