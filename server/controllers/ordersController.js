const { OrdersService } = require("../services/orderService");
const { OrderRepository } = require("../repositories/orderRepository");
const Orders = require("../models/Order.js");
const { ProductRepository } = require("../repositories/productRepository");
const Product = require("../models/Product");

const OrderRepo = new OrderRepository(Orders);
const ProductRepo = new ProductRepository(Product);

const OrdersServ = new OrdersService(OrderRepo, ProductRepo);
// const OrdersServ = new OrdersService(OrderRepo);

// create order route
exports.createOrder = async (req, res) => {
    try {
        // const product = {}
        // orderItems.itemID = order.productId;
        // orderItems.itemName = order.productId;
        // orderItems.itemOptions = order.productId;
        const newOrders = await OrdersServ.createOrders(req);
        res.json(newOrders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};

// list all orders
exports.listOrders = async (req, res) => {
    try {
        const orders = await OrdersServ.getOrders(req);
        res.json(orders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};

// get order by id
exports.getOrderById = async (req, res) => {
    try {
        const Orders = await OrdersServ.getOrderById(req);
        res.json(Orders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};

// update order status
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrders = await OrdersServ.updateOrders(req);
        res.json(updatedOrders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR });
    }
};
