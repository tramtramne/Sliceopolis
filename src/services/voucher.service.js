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
        console.log(totalPrice);
        let totalPriceTemp = totalPrice;
        if (voucher.type === 'PERCENTAGE') {
            console.log(totalPrice);
            totalPriceTemp = totalPrice - (totalPrice * voucher.value) / 100;
        } else {
            console.log(totalPrice + 1);
            totalPriceTemp = totalPrice - voucher.value;
        }

        if (voucher.maximumDiscount < totalPrice) {
            totalPriceTemp = totalPrice - voucher.maximumDiscount;
        }
        console.log(totalPriceTemp);
        return {
            status: 'success',
            message: 'Voucher applied successfully',
            totalPrice: totalPriceTemp,
        };
    }
}
module.exports = new Voucher();
