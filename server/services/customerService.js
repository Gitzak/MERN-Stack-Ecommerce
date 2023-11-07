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
        try {
            const response = {};
            const { email, password } = req.body;
            const customer = await this.customerRepo.Login(email);
            if (!customer) {
                response.message = CONSTANTS.INVALID_CREDENTIALS;
                response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS;
                return response;
            }
            if (!customer.active) {
                response.message = CONSTANTS.CUSTOMER_NOT_ACTIVE;
                response.status = CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE;
                return response;
            }
            if (!customer.validatAccount) {
                response.message = CONSTANTS.CUSTOMER_NOT_VALID;
                response.status = CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE;
                return response;
            }
            const passwordMatch = await VerifyPassword(password, customer.password);
            if (!passwordMatch) {
                response.message = CONSTANTS.INVALID_CREDENTIALS;
                response.status = CONSTANTS.SERVER_INVALID_CREDENTIALS;
                return response;
            }
            // Update the lastLogin field with the current timestamp
            const currentTimestamp = Date.now();
            // console.log(currentTimestamp);
            customer.lastLogin = currentTimestamp;
            await customer.save();

            const token = jwt.sign(
                {
                    customerId: customer._id,
                    active: customer.active,
                    customerFirstName: customer.firstName,
                    customerLastName: customer.lastName,
                    customerEmail: customer.email,
                    userRole: "CUSTOMER",
                },
                config.jwt.secret
            );

            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = "Login success";
            // todo: optimize the response
            response.customer = {
                _id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                creationDate: customer.creationDate,
                lastLogin: customer.lastLogin ? new Date(customer.lastLogin).toLocaleString() : null, // Format the timestamp
                validatAccount: customer.validatAccount,
                active: customer.active,
            };
            response.token = token;
            response.token_type = "Bearer";
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async RegisterCustomer(req) {
        const response = {};
        try {
            const { firstName, lastName, email, password, phoneNumber } = req.body;

            const existingCustomerByEmail = await this.customerRepo.findCustomerByEmail(email);

            if (existingCustomerByEmail) {
                response.message = "Email already exists.";
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            const hashedPass = await HashPassword(password);

            const newCustomer = {
                firstName,
                lastName,
                email,
                hashedPass,
                password,
                phoneNumber,
            };

            const customer = await this.customerRepo.RegisterCustomer(newCustomer);

            if (!customer) {
                response.message = CONSTANTS.SERVER_ERROR;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }

            const sendedCustomerMail = await SendMailToCustomer({
                customerId: customer._id,
                customerEmail: newCustomer.email,
                customerPassword: newCustomer.password,
            });

            response.message = CONSTANTS.USER_CREATED;
            response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async UpdateCustomerByAdmins(req) {
        const response = {};
        try {
            const id = req.params.id;
            const customer = await this.customerRepo.findCustomerById(id);

            if (!customer) {
                response.message = CONSTANTS.INVALID_CUSTOMER_ID;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }

            const { firstName, lastName, email, active } = req.body;

            const existingCustomerByEmail = await this.customerRepo.findCustomerByEmailExcludingId(email, id);

            if (existingCustomerByEmail) {
                response.message = "Email already exists.";
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            const updatedCustomer = {
                firstName,
                lastName,
                email,
                active,
            };

            const result = await this.customerRepo.UpdateCustomer(id, updatedCustomer);
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = CONSTANTS.CUSTOMER_PROFILE_UPDATED;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async UpdateCustomer(req) {
        const response = {};

        try {
            const id = req.id;
            const { firstName, lastName, email, password } = req.body;
            const existingCustomerByEmail = await this.customerRepo.findCustomerByEmailExcludingId(email, id);

            if (existingCustomerByEmail) {
                response.message = "Email already exists.";
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                return response;
            }

            const hashedPass = await HashPassword(password);

            const updatedCustomer = {
                firstName,
                lastName,
                email,
                password: hashedPass,
            };

            const updatedcustomer = await this.customerRepo.UpdateCustomer(id, updatedCustomer);

            if (updatedcustomer) {
                response.message = CONSTANTS.USER_UPDATED;
                response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
                return response;
            } else {
                response.message = CONSTANTS.INVALID_CUSTOMER_ID;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async getCustomerById(req) {
        const response = {};
        try {
            const customerId = req.params.id;
            const customer = await this.customerRepo.findCustomerById(customerId);
            if (!customer) {
                response.message = CONSTANTS.INVALID_CUSTOMER_ID;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = customer;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async getCustomers(req) {
        const query = req.query.query;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || "ASC";
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        const response = {};
        if (query) {
            try {
                const searchCustomers = await this.customerRepo.searchCustomers(query, skip, limit, sort);
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                response.data = searchCustomers;
                return response;
            } catch (error) {
                return error;
            }
        } else {
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            const customers = await this.customerRepo.getCustomers(skip, limit, sort);
            response.data = customers;
            return response;
        }
    }

    async Delete(req) {
        const response = {};

        try {
            const customerId = req.id;
            const deletedCustomer = await this.customerRepo.Delete(customerId);

            if (!deletedCustomer) {
                response.message = CONSTANTS.ALREADY_CUSTOMER_DELETED;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }

            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = CONSTANTS.USER_DELETED;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async getProfileCustomer(req) {
        const response = {};
        try {
            const customerId = req.id;
            const customer = await this.customerRepo.findCustomerById(customerId);
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = customer;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }

    async validateAccCustomer(req) {
        const response = {};
        try {
            const customerId = req.params.id;
            const customer = await this.customerRepo.findCustomerById(customerId);

            if (!customer) {
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                response.message = CONSTANTS.INVALID_CUSTOMER_ID;
                return response;
            }

            if (customer.validatAccount) {
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                response.message = CONSTANTS.INVALID_EMAIL_ALREADY_VALIDATED;
                return response;
            }

            const validatedCustomer = await this.customerRepo.validateAccCustomer(customerId);

            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = CONSTANTS.CUSTOMER_UPDATED;
            return response;
        } catch (error) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
    }
}

module.exports = { CustomerService };
