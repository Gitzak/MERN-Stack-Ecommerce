const { CustomerService } = require("../services/customerService");
const { CustomerRepository } = require("../repositories/customerRepository");
const Customer = require("../models/Customer");

const CustomerRepo = new CustomerRepository(Customer);
const CustomerServ = new CustomerService(CustomerRepo);

// login a customer
exports.loginCustomer = async (req, res) => {
    try {
        const user = await CustomerServ.loginCustomer(req);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// register a customer (is customer)
exports.registerCustomer = async (req, res) => {
    try {
        const newCustomer = await CustomerServ.RegisterCustomer(req);
        res.json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// update Customer data (only for admin and manager)
exports.updateCustomerDataByAdmins = async (req, res) => {
    try {
        const updatedCustomer = await CustomerServ.UpdateCustomerByAdmins(req);
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// update Customer data (only for Customer)
exports.updateCustomerData = async (req, res) => {
    try {
        const updatedCustomer = await CustomerServ.UpdateCustomer(req);
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get Customer by ID (only for admin and manager)
exports.getCustomerById = async (req, res) => {
    try {
        const Customer = await CustomerServ.getCustomerById(req);
        res.json(Customer);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all Customers (only for admin and manager)
exports.getCustomers = async (req, res) => {
    try {
        const results = await CustomerServ.getCustomers(req);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// delete Customer (is customer)
exports.deleteCustomer = async (req, res) => {
    try {
        const result = await CustomerServ.Delete(req);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// get customer profile (is customer)
exports.getProfileCustomer = async (req, res) => {
    console.log("profil");
    try {
        const profile = await CustomerServ.getProfileCustomer(req);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// validate customer account (is customer)
exports.validateAccCustomer = async (req, res) => {
    try {
        const validation = await CustomerServ.validateAccCustomer(req);
        res.json(validation);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
