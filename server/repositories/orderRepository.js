const CONSTANTS = require("../constants/index");

class OrderRepository {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    async CreateOrder(order) {
        const newOrder = await this.orderModel.create(order);
        return newOrder;
    }

    async getOrders() {
        const data = await this.orderModel.aggregate([{ $sort: { orderDate: -1 } }]).exec();
        return data;
    }

    async getTopFiveProduct() {
        try {
            const topFiveProducts = await this.orderModel.aggregate([
                {
                    $unwind: "$orderItems",
                },
                {
                    $group: {
                        _id: "$orderItems.itemName",
                        count: { $sum: "$orderItems.quantity" },
                        totalPrice: { $sum: { $multiply: ["$orderItems.quantity", "$orderItems.unitPrice"] } },
                        unitPrice: { $first: "$orderItems.unitPrice" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        name: "$_id",
                        count: 1,
                        totalPrice: 1,
                        unitPrice: 1,
                        initQtyTotalPrice: 1,
                    },
                },
                {
                    $sort: { count: -1 },
                },
                {
                    $limit: 5,
                },
            ]);

            return topFiveProducts;
        } catch (error) {
            console.error("Error fetching top five products:", error);
            throw error;
        }
    }

    async getSalesChartData() {
        try {
            const salesData = await this.orderModel.aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$orderDate" } },
                        },
                        totalSales: { $sum: "$cartTotalPrice" },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);

            return salesData;
        } catch (error) {
            console.error("Error fetching sales chart data:", error);
            throw error;
        }
    }

    async getBestProducts(limit) {
        const bestProducts = await this.orderModel.aggregate([
            { $unwind: "$orderItems" },
            {
                $group: {
                    _id: "$orderItems.itemID",
                    totalQuantity: { $sum: "$orderItems.quantity" },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productData",
                },
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    totalQuantity: 1,
                    productData: { $arrayElemAt: ["$productData", 0] },
                },
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: limit },
        ]);

        return bestProducts;
    }

    async getNewOrders() {
        const data = await this.orderModel.aggregate([{ $match: { status: "Open" } }, { $sort: { orderDate: -1 } }]).exec();
        return data;
    }

    async findOrderById(orderId) {
        const order = await this.orderModel.findById(orderId);
        return order;
    }

    async UpdateOrder(id, order) {
        const updatedOrder = await this.orderModel.findOneAndUpdate({ _id: id }, order, { upsert: true, new: true });
        return updatedOrder;
    }
}

module.exports = { OrderRepository };
