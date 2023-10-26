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

  // async sendMail(customer) {
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.mailtrap.io",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: cd70b6d0c2eb72,
  //       pass: de69aefaaeae72,
  //     },
  //   });

  //   let mailOptions = {
  //     from: "email@example.com",
  //     to: customer.email,
  //     subject: "Welcome !",
  //     text: `Welcome ${customer.firstName},\n\ your account is created successfuly, Please click the link below to activate it:`,
  //   };

  //   let info = await transporter.sendMail(mailOptions);
  // }

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
    console.log(customerWithoutPassword);

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
    console.log(customers.length);
    return customers;
  }

  async searchCustomers(query) {
    try {
      const searchedCustomers = await this.customerModel.find({
        $or: [
          { email: { $regex: query, $options: "i" } },
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      });
      return searchedCustomers;
    } catch (error) {
      throw error;
    }
  }

  async Delete(customerId) {
    const customer = await this.customerModel.findByIdAndDelete(customerId);
    return customer;
  }
  async validateAccCustomer(customerId) {
    try {
      const customer = await this.customerModel.findById(customerId);
      const validated = true;
      customer.validatAccount = validated;
      await customer.save();
      return customer;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { CustomerRepository };
