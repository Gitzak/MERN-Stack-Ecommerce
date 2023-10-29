const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const {
  createOrder,
  listOrders,
  getOrderById,
  updateOrder,
} = require('../../controllers/ordersController')

// create order route
router.post("/", createOrder);
// list all orders
router.get("/", isAdminManager, listOrders);
// get order by id
router.get('/:id', isAdminManager, getOrderById)
// update order status
router.put('/:id', isAdminManager, updateOrder)

module.exports = router;
