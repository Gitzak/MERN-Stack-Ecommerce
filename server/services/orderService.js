const CONSTANTS = require("../constants");
const config = require("../config/keys");

class OrdersService {
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  // Create new order 
  async createOrders(req) {
    // todo: verify product exist and quantity

    // todo: calculate total Price instead of body

    // todo: decrease quantity from product on creation order

    // todo: save order

    // todo: send emails to customer and client (notify)

    const response = {};
    try {
      const customerID = req.id
      const customerFirstName = req.customerFirstName
      const customerLastName = req.customerLastName
      const { orderItems, cartTotalPrice } = req.body;

      if (!orderItems || !cartTotalPrice) {
        response.message = CONSTANTS.FIELD_EMPTY;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }

      const newOrder = {
        customerId: customerID,
        customerFirstName: customerFirstName,
        customerLastName: customerLastName,
        orderItems,
        cartTotalPrice
      };

      const order = await this.orderRepo.CreateOrder(newOrder);

      if (!order) {
        response.message = CONSTANTS.SERVER_ERROR_MESSAGE
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE
        return response;
      }

      response.message = "order created successfully"
      response.status = 201
      return response;
    } catch {
      response.message = error.message
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }

  // Get and search for all Orders
  async getOrders(req) {
    try {
      const response = {}
      // Todo: We can add search query later
      const page = parseInt(req.query.page) || 1;
      const sort = req.query.sort || "ASC";
      // console.log("page", page);
      // console.log("sort", sort);
      const pageSize = 10; // Number of items per page
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      const orders = await this.orderRepo.getOrders(
        skip,
        limit,
        sort
      );
      response.orders = orders;
      return response;
    } catch (error) {
      // Handle the error, you can log the error or throw a custom error
      console.error("Error in getOrders:", error);
      throw error; // You can re-throw the error or return a custom error message
    }
  }


  // Get one Order by its ID
  async getOrderById(req) {
    const response = {}
    try {
      const orderId = req.params.id;
      const foundedOrder = await this.orderRepo.findOrderById(orderId);

      if (!foundedOrder) {
        response.message = CONSTANTS.CATEGORY_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }
      return foundedOrder;
    } catch (error) {
      response.message = error.message
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }

  // Update Orders
  async updateOrders(req) {
    const response = {};
    try {
      const id = req.params.id;
      const { status } = req.body;

      const updatedOrder = {
        status,
      };

      const updatedOrderMessage = await this.orderRepo.UpdateOrder(
        id,
        updatedOrder
      );

      if (!updatedOrderMessage) {
        response.message = "invalid order id"
        response.status = 404
        return response
      }

      response.message = "order status updated successfully"
      response.status = 200
      return response
    } catch (error) {
      response.message = error.message
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

  }

}

module.exports = { OrdersService };
