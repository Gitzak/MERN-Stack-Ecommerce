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

    async findCustomerByEmail(email) {
        const customer = await this.customerModel.findOne({ email: email }).select("-password");
        return customer;
    }

    async findCustomerByEmailExcludingId(email, excludeId) {
        const customer = await this.customerModel.findOne({ email: email, _id: { $ne: excludeId } }).select("-password");
        return customer;
    }

    async RegisterCustomer(customer) {
        const { firstName, lastName, email, hashedPass, phoneNumber } = customer;

        const createCustomer = await this.customerModel.create({
            firstName,
            lastName,
            email,
            password: hashedPass,
            phoneNumber
        });

        const customerWithoutPassword = createCustomer.toObject();
        delete customerWithoutPassword.password;

        return customerWithoutPassword;
    }

    async UpdateCustomer(id, customer) {
        const result = await this.customerModel.findOneAndUpdate({ _id: id }, customer, { upsert: true, new: true });
        // console.log(result);
        return result;
    }

    async getCustomers(skip, limit, sort) {
        const customers = await this.customerModel
            .aggregate([
                { $sort: { creationDate: -1 } },
                { $project: { password: 0 } }, // Exclude the password field
            ])
            .skip(skip)
            .limit(limit)
            .exec();
        return customers;
    }

    async searchCustomers(query, skip, limit, sort) {
        const queryOptions = {
            $or: [{ email: { $regex: query, $options: "i" } }, { firstName: { $regex: query, $options: "i" } }, { lastName: { $regex: query, $options: "i" } }],
        };

        const searchedCustomers = await this.customerModel
            .find(queryOptions)
            .select("-password")
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
        const validatedCustomer = await this.customerModel.findOneAndUpdate({ _id: customerId }, {validatAccount: true}, { upsert: false, new: true });
        return validatedCustomer;
    }

}

module.exports = { CustomerRepository };
