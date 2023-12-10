const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const { isCustomer } = require("../../middleware/isCustomer");
const { validateIdFormat } = require("../../middleware/validateIdFormat");
const { createOrder, listOrders, listTopFiveProducts, getSalesChartData, listNewOrders, getOrderById, updateOrder } = require("../../controllers/ordersController");

// create order route
router.post("/", isCustomer, createOrder);
// list all orders
router.get("/", isAdminManager, listOrders);
// list Top 5 Products
router.get("/top_five_products", isAdminManager, listTopFiveProducts);
// list Top 5 Products
router.get("/get_sales_chart_data", isAdminManager, getSalesChartData);
// list all new orders
router.get("/newOrders", isAdminManager, listNewOrders);
// get order by id
router.get("/:id", isAdminManager,validateIdFormat, getOrderById);
// update order status
router.put("/:id", isAdminManager, validateIdFormat, updateOrder);

module.exports = router;
