const { CustomerService } = require("../services/customerService");
const { CustomerRepository } = require("../repositories/customerRepository");
const customer = require("../models/customer");

const CustomerRepo = new CustomerRepository(Customer);
const CustomerServ = new CustomerService(CustomerRepo);

// login a customer 
const loginCustomer = async (req, res) => {
    const user = await CustomerServ.loginCustomer(req)
    res.json(user)
}

// register a customer (is customer)
const RegisterCustomer = async (req, res) => {
  const newCustomer = await CustomerServ.RegisterCustomer(req);
  res.json(newCustomer);
};

//update Customer data (only for admin and manager)
const updateCustomerData = async (req, res) => {
  const updatedCustomer = await CustomerServ.UpdateCustomer(req);
  console.log(updatedCustomer);
  res.json(updatedCustomer);
};

// Get Customer by ID (only for admin and manager)
const getCustomerById = async (req, res) => {
  try {
    const CustomerId = req.params.id;
    const Customer = await CustomerServ.getCustomerById(CustomerId);
    if (!Customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ status: 200, data: [Customer] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//Get all Customers (only for admin and manager)
const getCustomers = async (req, res) => {
//   const Customers = await CustomerServ.getCustomers(req);
  const results = await CustomerServ.searchCustomers(req);

  res.json(results)
}

// delete Customer  (is customer)
const deleteCustomer = async (req, res) => {
  const CustomerId = req.params.id;
  const result = await CustomerServ.Delete(CustomerId);
  res.json(result);
};

// get customer profile (is customer)
const getProfileCustomer = async (req, res) => {
    const profile = await CustomerServ.getProfileCustomer(req);
    res.json(profile);
  };

//validate customer account (is customer)
const validateAccCustomer = async (req, res) => {
    const CustomerId = req.params.id;
    const validation = await CustomerServ.validateAccCustomer(CustomerId);
    res.json(validation);
  };

module.exports = { getCustomerById, RegisterCustomer, updateCustomerData, getCustomers, deleteCustomer, loginCustomer, validateAccCustomer, getProfileCustomer };
