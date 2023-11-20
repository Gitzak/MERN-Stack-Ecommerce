const express = require("express");
const router = express.Router();
const { isAdminManager } = require("../../middleware/isAdminManager");
const { isCustomer } = require("../../middleware/isCustomer");
const { validateIdFormat } = require("../../middleware/validateIdFormat");
const { createOrder, listOrders, getOrderById, updateOrder } = require("../../controllers/ordersController");

// create order route
router.post("/", isCustomer, createOrder);
// list all orders
router.get("/", isAdminManager, listOrders);
// get order by id
router.get("/:id", isAdminManager,validateIdFormat, getOrderById);
// update order status
router.put("/:id", isAdminManager, validateIdFormat, updateOrder);

module.exports = router;




// router.post("/", (req, res) => {
//     console.log(req.body)
//     const authHeader = req.headers.authorization || null;
//     const token = authHeader && authHeader.split(" ")[1];
//     console.log(req.headers.authorization.split(" ")[0])
//     res.json("hiii")
// });