const { model } = require('mongoose');
const voucherService = require('../services/voucher.service');

const getVoucherById = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the id from the request parameters
        const data = await voucherService.getVoucherById(id); // Pass the id to the correct function in voucherService
        return res.json(data);
    } catch (error) {
        throw new Error(error);
        next(error);
    }
};

module.exports = { getVoucherById };
