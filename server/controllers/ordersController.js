const { OrdersService } = require("../services/orderService");
const { OrderRepository } = require("../repositories/orderRepository");
const Orders = require("../models/Order.js");

const OrderRepo = new OrderRepository(Orders);
const OrdersServ = new OrdersService(OrderRepo);

// create order route
exports.createOrder = async (req, res) => {
    try {
        const newOrders = await OrdersServ.createOrders(req);
        res.json(newOrders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// list all orders
exports.listOrders = async (req, res) => {
    try {
        const orders = await OrdersServ.getOrders(req);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// get order by id
exports.getOrderById = async (req, res) => {
    try {
        const Orders = await OrdersServ.getOrderById(req);
        if (!Orders) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ status: 200, data: [Orders] });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// update order status
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrders = await OrdersServ.updateOrders(req);
        res.json(updatedOrders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
