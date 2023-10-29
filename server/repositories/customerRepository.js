const CONSTANTS = require("../constants/index");
const nodemailer = require("nodemailer");

class CustomerRepository {
  constructor(customerModel) {
    this.customerModel = customerModel;
  }
  async Login(email) {
    const customer = await this.customerModel.findOne({ email: email });
    return customer;
  }

  async findCustomerById(customerId) {
    const customer = await this.customerModel.findById(customerId).select("-password");
    return customer;
  }

  async RegisterCustomer(customer) {
    const { firstName, lastName, email, hashedPass } = customer;

    const createCustomer = await this.customerModel.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    const customerWithoutPassword = createCustomer.toObject();
    delete customerWithoutPassword.password;

    return customerWithoutPassword;
  }

  async UpdateCustomer(id, customer) {
    const filter = { _id: id };

    const result = await this.customerModel.findOneAndUpdate({ _id: id }, customer, { upsert: true, new: true });

    if (result) {
      return {
        message: CONSTANTS.USER_UPDATED,
        status: CONSTANTS.SERVER_UPDATED_HTTP_CODE,
      };
    } else {
      return {
        message: CONSTANTS.USER_NOT_FOUND,
        status: CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE,
      };
    }
  }

  async getCustomers(skip, limit, sort) {
    const customers = await this.customerModel
      .aggregate([{ $sort: { creationDate: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();
    // console.log(customers.length);
    return customers;
  }

  async searchCustomers(query, skip, limit, sort) {
    const queryOptions = {
      $or: [
        { email: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    };

    const searchedCustomers = await this.customerModel
      .find(queryOptions)
      .sort({ creationDate: sort === "ASC" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    return searchedCustomers;
  }

  async Delete(customerId) {
    const customer = await this.customerModel.findByIdAndDelete(customerId);
    return customer;
  }

  async validateAccCustomer(customerId) {
    const customer = await this.customerModel.findById(customerId).select('-password');

    if (!customer) {
      return {
        status: 404,
        message: "invalid customer id"
      };
    }

    if (customer.validatAccount) {
      return {
        status: 400,
        message: "Invalid action, this email is already validated"
      };
    }

    customer.validatAccount = true;
    await customer.save();

    return {
      status: 200,
      message: "Your account validated successfully"
    };
  }
}

module.exports = { CustomerRepository };
