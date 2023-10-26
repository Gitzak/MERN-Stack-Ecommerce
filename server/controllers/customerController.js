const { CustomerService } = require("../services/customerService");
const { CustomerRepository } = require("../repositories/customerRepository");
const Customer = require("../models/Customer");

const CustomerRepo = new CustomerRepository(Customer);
const CustomerServ = new CustomerService(CustomerRepo);

// login a customer 
exports.loginCustomer = async (req, res) => {
  const user = await CustomerServ.loginCustomer(req)
  res.json(user)
}

// register a customer (is customer)
exports.registerCustomer = async (req, res) => {
  const newCustomer = await CustomerServ.RegisterCustomer(req);
  res.json(newCustomer);
};

//update Customer data (only for admin and manager)
exports.updateCustomerDataByAdmins = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  try {
    const updatedCustomer = await CustomerServ.UpdateCustomerByAdmins(req);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Server error 2" });
  }
};

//update Customer data (only for Customer)
exports.updateCustomerData = async (req, res) => {
  const updatedCustomer = await CustomerServ.UpdateCustomer(req);
  console.log(updatedCustomer);
  res.json(updatedCustomer);
};


// Get Customer by ID (only for admin and manager)
exports.getCustomerById = async (req, res) => {
  try {
    const Customer = await CustomerServ.getCustomerById(req);
    if (!Customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ status: 200, data: [Customer] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//Get all Customers (only for admin and manager)
exports.getCustomers = async (req, res) => {
  //   const Customers = await CustomerServ.getCustomers(req);
  const results = await CustomerServ.getCustomers(req);
  res.json(results)
}

// delete Customer  (is customer)
exports.deleteCustomer = async (req, res) => {
  const result = await CustomerServ.Delete(req);
  res.json(result);
};

// get customer profile (is customer)
exports.getProfileCustomer = async (req, res) => {
  const profile = await CustomerServ.getProfileCustomer(req);
  res.json(profile);
};

//validate customer account (is customer)
exports.validateAccCustomer = async (req, res) => {
  try {
    const validation = await CustomerServ.validateAccCustomer(req);
    res.json(validation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
