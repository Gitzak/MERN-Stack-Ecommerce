const { OrdersService } = require("../services/orderService");
const { OrderRepository } = require("../repositories/orderRepository");
const Orders = require("../models/Order.js");
const { ProductRepository } = require("../repositories/productRepository");
const Product = require("../models/Product");
const CONSTANTS = require("../constants/index");
const { sendOrder } = require("../middleware/websocket.js");

const OrderRepo = new OrderRepository(Orders);
const ProductRepo = new ProductRepository(Product);

const OrdersServ = new OrdersService(OrderRepo, ProductRepo);

// create order route
exports.createOrder = async (req, res) => {
    try {
        const newOrders = await OrdersServ.createOrders(req);
        sendOrder(newOrders)
        res.status(newOrders.status).json(newOrders);
    } catch (error) {
        // console.log(error);
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// list all orders
exports.listOrders = async (req, res) => {
    try {
        const orders = await OrdersServ.getOrders(req);
        res.status(orders.status).json(orders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// list top five products
exports.listTopFiveProducts = async (req, res) => {
    try {
        const orders = await OrdersServ.getTopFiveProducts(req);
        res.status(orders.status).json(orders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// list all orders for the bestSeller
exports.listForBestSeller = async (req, res) => {
    try {
        const orders = await OrdersServ.getOrders(req);
        res.status(orders.status).json(orders);
        // return orders;
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// list top five products
exports.getSalesChartData = async (req, res) => {
    try {
        const orders = await OrdersServ.getSalesChartData(req);
        res.status(orders.status).json(orders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// list all orders
exports.listNewOrders = async (req, res) => {
    try {
        const orders = await OrdersServ.getNewOrders(req);
        res.status(orders.status).json(orders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// get order by id
exports.getOrderById = async (req, res) => {
    try {
        const order = await OrdersServ.getOrderById(req);
        res.status(order.status).json(order);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// update order status
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrders = await OrdersServ.updateOrders(req);
        res.status(updatedOrders.status).json(updatedOrders);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};
