const voucherModel = require('../models/Voucher');

class Voucher {
    async getAllVoucher() {
        const data = await voucherModel.find({});
        return data;
    }
    async getVoucherById(id) {
        const data = await voucherModel.findById(id).exec();
        return data;
    }

    async applyVoucherToOrder(totalPrice, voucher, idUser) {
        const listUser = voucher.user_list;

        console.log(listUser.includes(idUser));
        if (listUser.includes(idUser)) {
            return {
                status: 'error',
                message: 'You have already used this voucher',
                totalPrice: totalPrice,
            };
        }
        console.log(totalPrice < voucher.minimumOrder);
        if (totalPrice < voucher.minimumOrder) {
            return {
                status: 'error',
                message: 'Price of order must be greater than ' + voucher.minimumOrder,
                totalPrice: totalPrice,
            };
        }

        voucher.used += 1;
        voucher.user_list.push(idUser);

        await voucher.save();

        let priceDiscount = 0;
        if (voucher.type === 'PERCENTAGE') {
            priceDiscount = (totalPrice * voucher.value) / 100;
        } else {
            priceDiscount = voucher.value;
        }
        if (voucher.maximumDiscount < priceDiscount) {
            priceDiscount = voucher.maximumDiscount;
        }
        var totalPriceTemp = totalPrice - priceDiscount;
        if (totalPriceTemp < 0) {
            totalPriceTemp = 0;
        }
        return {
            totalPrice: totalPriceTemp,
            message: 'success',
        };
    }

    async createVoucher(body) {
        const data = await voucherModel.create(body);
        return data;
    }
}
module.exports = new Voucher();
