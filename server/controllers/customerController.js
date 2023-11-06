const { CustomerService } = require("../services/customerService");
const { CustomerRepository } = require("../repositories/customerRepository");
const Customer = require("../models/Customer");
const CONSTANTS = require("../constants/index");

const CustomerRepo = new CustomerRepository(Customer);
const CustomerServ = new CustomerService(CustomerRepo);

// login a customer
exports.loginCustomer = async (req, res) => {
    try {
        const customer = await CustomerServ.loginCustomer(req);
        res.status(customer.status).json(customer);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// register a customer (is customer)
exports.registerCustomer = async (req, res) => {
    try {
        const newCustomer = await CustomerServ.RegisterCustomer(req);
        res.status(newCustomer.status).json(newCustomer);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// update Customer data (only for admin and manager)
exports.updateCustomerDataByAdmins = async (req, res) => {
    try {
        const updatedCustomer = await CustomerServ.UpdateCustomerByAdmins(req);
        res.status(updatedCustomer.status).json(updatedCustomer);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// update Customer data (only for Customer)
exports.updateCustomerData = async (req, res) => {
    try {
        const updatedCustomer = await CustomerServ.UpdateCustomer(req);
        res.status(updatedCustomer.status).json(updatedCustomer);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Get Customer by ID (only for admin and manager)
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await CustomerServ.getCustomerById(req);
        res.status(customer.status).json(customer);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// Get all Customers (only for admin and manager)
exports.getCustomers = async (req, res) => {
    try {
        const results = await CustomerServ.getCustomers(req);
        res.status(results.status).json(results);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// delete Customer (is customer)
exports.deleteCustomer = async (req, res) => {
    try {
        const result = await CustomerServ.Delete(req);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// get customer profile (is customer)
exports.getProfileCustomer = async (req, res) => {
    try {
        const profile = await CustomerServ.getProfileCustomer(req);
        res.status(profile.status).json(profile);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};

// validate customer account (is customer)
exports.validateAccCustomer = async (req, res) => {
    try {
        const validation = await CustomerServ.validateAccCustomer(req);
        res.status(validation.status).json(validation);
    } catch (error) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({ message: CONSTANTS.SERVER_ERROR, status: CONSTANTS.SERVER_ERROR_HTTP_CODE });
    }
};
