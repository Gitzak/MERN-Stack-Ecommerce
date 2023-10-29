const mongoose = require('mongoose');

const { ORDERS_STATUS } = require('../constants');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
    },
    // todo: Items to added to the order schema
    orderItems: {
        type: [String],
        required: true,
    },
    orderDate: {
        type: Number,
        default: Date.now,
    },
    cartTotalPrice: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: [ORDERS_STATUS.Open, ORDERS_STATUS.Shipped, ORDERS_STATUS.Paid, ORDERS_STATUS.Closed, ORDERS_STATUS.Cancled],
        default: ORDERS_STATUS.Open
    },
});

module.exports = mongoose.model('Order', orderSchema);
