const reportService = require('../services/report.service');
const { SuccessResponse } = require('../common/success.response');
const reportForRevenue = async (req, res, next) => {
    const year = req.query.year || new Date().getFullYear();
    const monthlyReport = await reportService.getRevenueReport(year);
    return new SuccessResponse({
        metadata: { year, monthlyReport },
    }).send({ req, res });
};
const reportForProduct = async (req, res, next) => {
    const type = req.query.type || 'PIZZA';

    const monthlyReport = await reportService.getProductReportByYear(type);
    return new SuccessResponse({
        metadata: { type, monthlyReport },
    }).send({ req, res });
};
module.exports = {
    reportForRevenue,
    reportForProduct,
};
