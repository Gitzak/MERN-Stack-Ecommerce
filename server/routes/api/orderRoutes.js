const express = require("express");
const router = express.Router();
// controller functions
const {
  createOrder,
  listOrders,
  getOrderById,
  updateOrder,
} = require('../../controllers/ordersController')

// create order route
router.post("/", createOrder);
// list all orders
router.get("/", listOrders);
// get order by id
router.get('/:id', getOrderById)
// update order status
router.put('/:id', updateOrder)

module.exports = router;
