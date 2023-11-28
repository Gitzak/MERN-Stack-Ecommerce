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
