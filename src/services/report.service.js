const Order = require('../models/Order');
const Product = require('../models/Product');
class Report {
    async getRevenueReport(year) {
        const orderData = await Order.find({
            created_at: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${Number(year) + 1}-01-01`) },
            'delivery.status': 'DELIVERED',
            'payment.status': 'PAID',
        });

        const ordersByMonth = {};
        orderData.forEach((order) => {
            const month = order.created_at.getMonth() + 1; // Get month (1-12)
            if (!ordersByMonth[month]) {
                ordersByMonth[month] = [];
            }
            ordersByMonth[month].push(order);
        });

        // Calculate total revenue for each month
        const monthlyReport = Object.keys(ordersByMonth).map((month) => {
            const totalRevenue = ordersByMonth[month].reduce((sum, order) => {
                return sum + order.total;
            }, 0); // khởi tạo cho sum là 0
            return {
                month: Number(month),
                totalOrders: ordersByMonth[month].length,
                revenue: totalRevenue,
            };
        });

        return monthlyReport;
    }
    async getProductReportByYear(type) {
        console.log(type);
        const topProducts = await Product.aggregate([
            {
                $match: {
                    category: type, // Match products based on the 'type' field
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    sizes: 1, // Include other fields you want to retrieve
                    totalSold: { $sum: '$sizes.sold' }, // Calculate totalSold based on sizes.sold
                },
            },
            {
                $sort: { totalSold: -1 },
            },
            {
                $limit: 10,
            },
        ]);
        console.log(topProducts);
        return topProducts;
    }
}

module.exports = new Report();
