const CONSTANTS = require("../constants");
const config = require("./../config/keys");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");
const SendMailToCustomer = require("../utils/sendMailToCustomer");

class CustomerService {
  constructor(customerRepo) {
    this.customerRepo = customerRepo;
  }

  async loginCustomer(req) {
    const response = {};
    const { email, password } = req.body;
    const customer = await this.customerRepo.Login(email);
    if (!customer) {
      response.message = CONSTANTS.SERVER_USER_INVALID_CREDENTIALS;
      response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS;
      return response;
    }
    if (!customer.active) {
      response.message = CONSTANTS.USER_NOT_ACTIVE;
      response.status = CONSTANTS.SERVER_IFORBIDDEN_HTTP_CODE;
      return response;
    }
    if (!customer.validatAccount) {
      response.message = CONSTANTS.USER_NOT_ACTIVE;
      response.status = CONSTANTS.SERVER_IFORBIDDEN_HTTP_CODE;
      return response;
    }
    const passwordMatch = await VerifyPassword(password, customer.password);
    if (!passwordMatch) {
      response.message = CONSTANTS.SERVER_USER_INVALID_CREDENTIALS;
      response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS;
      return response;
    }
    // Update the lastLogin field with the current timestamp
    const currentTimestamp = Date.now();
    console.log(currentTimestamp);
    customer.lastLogin = currentTimestamp;
    await customer.save();

    const token = jwt.sign(
      {
        customerId: customer._id,
        active: customer.active,
      },
      config.jwt.secret
    );

    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.message = "Login success";
    response.customer = {
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      creationDate: customer.creationDate,
      lastLogin: customer.lastLogin
        ? new Date(customer.lastLogin).toLocaleString()
        : null, // Format the timestamp
      lastUpdate: customer.lastUpdate
        ? new Date(customer.lastUpdate).toLocaleString()
        : null, // Format the timestamp
      validatAccount: customer.validatAccount,
      active: customer.active,
    };
    response.token = token;
    response.token_type = "Bearer";
    return response;
  }

  async RegisterCustomer(req) {
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

  async UpdateCustomerByAdmins(req) {
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

  async UpdateCustomer(req) {
    const id = req.params.id;

    const response = {};

    const { firstName, lastName, email, password } = req.body;

    const hashedPass = await HashPassword(password);

    const updatedCustomer = {
      firstName,
      lastName,
      email,
      password: hashedPass
    };

    const updatedcustomer = await this.customerRepo.UpdateCustomer(
      id,
      updatedCustomer
    );

    response.message = updatedcustomer;

    return response;
  }

  async getCustomerById(req) {
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

  async getCustomers(req) {
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

  async Delete(customerId) {
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

  async getProfileCustomer(req) {
    try {
      const customerId = req.customerId;
      const customer = await this.customerRepo.findCustomerById(customerId);
      return customer;
    } catch (error) {
      throw error;
    }
  }

  async validateAccCustomer(req) {
    try {
      const customerId = req.params.id;
      const customer = await this.customerRepo.validateAccCustomer(customerId);
      return customer;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { CustomerService };
