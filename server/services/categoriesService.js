const CONSTANTS = require("../constants");
const config = require("./../config/keys");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");
const SendMailToCustomer = require("../utils/sendMailToCustomer");

class CategoriesService {
  constructor(customerRepo) {
    this.customerRepo = customerRepo;
  }


  async createCategories(req) {
    const response = {};

    const { firstName, lastName, email, password } = req.body;

    //todo: we must add validation
    if (!firstName || !lastName || !email || !password) {
      response.message = CONSTANTS.FIELD_EMPTY;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      return response;
    }

    const hashedPass = await HashPassword(password);

    const newCustomer = {
      firstName,
      lastName,
      email,
      hashedPass,
      password,
    };

    const customer = await this.customerRepo.RegisterCustomer(newCustomer);

    console.log(customer._id);

    if (!customer) {
      response.message = CONSTANTS.SERVER_ERROR_MESSAGE;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }

    const sendedCustomerMail = await SendMailToCustomer({
      customerId: customer._id,
      customerEmail: newCustomer.email,
      customerPassword: newCustomer.password,
    });

    response.message = CONSTANTS.USER_CREATED;
    response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
    response.data = customer;
    response.mail = sendedCustomerMail;
    return response;
  }
  
  async getCategories(req) {
    const query = req.query.query
    if (query) {
      try {
        const searchCustomers = await this.customerRepo.searchCustomers(query);
        return searchCustomers;
      } catch (error) {
        return error;
      }
    } else {
      const page = parseInt(req.query.page) || 1;
      const sort = req.query.sort || "ASC";
      console.log("page", page);
      console.log("sort", sort);
      const pageSize = 10; // Number of items per page
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      const response = {};
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      const customers = await this.customerRepo.getCustomers(skip, limit, sort);
      response.customers = customers;
      return response;
    }
  }

  async getCategoriesById(req) {
    try {
      const customerId = req.params.id;
      const customer = await this.customerRepo.findCustomerById(customerId);
      if (customer === null || customer === undefined) {
        // If customer is not found, return a meaningful response
        return { message: 'Customer not found', status: 404 };
      }
      return customer;
    } catch (error) {
      throw error;
    }
  }

  async updateCategories(req) {
    const id = req.params.id;

    const response = {};

    const { firstName, lastName, email, active } = req.body;

    const updatedCustomer = {
      firstName,
      lastName,
      email,
      active,
    };

    const updatedcustomer = await this.customerRepo.UpdateCustomer(
      id,
      req.body
    );

    response.message = updatedcustomer;

    return response;
  }

  async deleteCategories(req) {
    const response = {};

    try {
      const customerId = req.params.id;
      const deletedCustomer = await this.customerRepo.Delete(customerId);

      if (!deletedCustomer) {
        response.message = CONSTANTS.USER_NOT_FOUND;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }

      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      response.message = CONSTANTS.USER_DELETED;
      return response;
    } catch (error) {
      response.message = "An error occurred while deleting the customer.";
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      console.error(error);
    }
  }

}

module.exports = { CustomerService };
