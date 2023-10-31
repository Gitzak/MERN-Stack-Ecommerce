const CONSTANTS = require("../constants/index");

class OrderRepository {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async CreateOrder(order) {
    const { customerId, orderItems, cartTotalPrice } = order;
    const createOrder = await this.orderModel.create({
      customerId,
      orderItems,
      cartTotalPrice
    });
    return createOrder;
  }

  async getOrders(skip, limit, sort) {
    const foundedOrders = await this.orderModel
      .aggregate([{ $sort: { orderDate: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();
    return foundedOrders;
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