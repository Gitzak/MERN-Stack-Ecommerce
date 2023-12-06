const { body } = require("express-validator");
const CONSTANTS = require("../constants/index");

exports.validateUserLogin = [body("email", "Email is required").notEmpty(), body("email", "Invalid email format").isEmail(), body("password", "Password is required").notEmpty()];

exports.validateUserForm = [
    body("role").notEmpty().withMessage("Role is required"),
    body("userName").notEmpty().withMessage("Username is required"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
];

exports.validateUserFormUpdate = [
    body("role").notEmpty().withMessage("Role is required"),
    body("userName").notEmpty().withMessage("Username is required"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("active").isBoolean().withMessage("Active must be a boolean value"),
];

exports.validateCustomerLogin = [body("email", "Email is required").notEmpty(), body("email", "Invalid email format").isEmail(), body("password", "Password is required").notEmpty()];

exports.validateCustomerForm = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    // body("phoneNumber")
    //     .notEmpty()
    //     .withMessage("Phone number is required")
    //     .custom((value) => {
    //         const phoneRegex = /^[+][0-9]+$/;
    //         if (!phoneRegex.test(value) || value.includes("-")) {
    //             throw new Error("Invalid phone number format");
    //         }
    //         return true;
    //     }),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
];

exports.validateCustomerFormUpdatePut = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("phoneNumber")
        .notEmpty()
        .withMessage("Phone number is required")
        .custom((value) => {
            const phoneRegex = /^[+][0-9]+$/;
            if (!phoneRegex.test(value) || value.includes("-")) {
                throw new Error("Invalid phone number format");
            }
            return true;
        }),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("active").isBoolean().withMessage("Active must be a boolean value"),
];

exports.validateCustomerFormUpdatePatch = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
];

exports.validateCategoryForm = [
    body("category_name").notEmpty().withMessage("Category name is required"),
    body("active").optional().isBoolean().withMessage("Active must be a boolean value"),
];

exports.validateCategoryFormUpdate = [
    body("category_name").notEmpty().withMessage("Category name is required"),
    body("active").optional().isBoolean().withMessage("Active must be a boolean value"),
];

exports.validateSubCategoryForm = [body("subCategory_name").notEmpty().withMessage("Subcategory name is required"), body("category_id").notEmpty().withMessage("Category Parent is required"), body("active").isBoolean().withMessage("Active must be a boolean value")];

exports.validateSubCategoryFormUpdate = [body("subCategory_name").notEmpty().withMessage("Subcategory name is required"), body("category_id").notEmpty().withMessage("Category Parent is required"), body("active").isBoolean().withMessage("Active must be a boolean value")];

const validateOptions = (value) => {
    if (!value) {
        return true;
    }

    if (!Array.isArray(value)) {
        throw new Error("Options must be an array of objects");
    }

    for (const option of value) {
        if (!option.label || typeof option.label !== "string") {
            throw new Error("Option label must be a non-empty string");
        }

        if (!Array.isArray(option.option) || option.option.length === 0 || !option.option.every((opt) => typeof opt === "string")) {
            throw new Error("Option option must be a non-empty array of strings");
        }
    }

    return true;
};

exports.validateProductForm = [
    body("sku").notEmpty().withMessage("SKU is required"),
    body("productName").notEmpty().withMessage("Product Name is required"),
    body("categories").isArray({ min: 1 }).withMessage("Categories is required"),
    body("shortDescription").notEmpty().withMessage("Short Description is required"),
    body("longDescription").notEmpty().withMessage("Long Description is required"),
    body("price").isNumeric().withMessage("Price must be a numeric value"),
    body("discountPrice").isNumeric().withMessage("Discount Price must be a numeric value"),
    body("quantity").isInt().withMessage("Quantity must be an integer value"),
    body("options").custom(validateOptions),
    body("active").isBoolean().withMessage("Active must be a boolean value"),
    // Multi Images Add
    body("images").custom((value, { req }) => {
        if (!req.files) {
            return true;
        }

        const allowedExtensions = ["jpg", "jpeg", "png"];
        let isValid = true;

        req.files.forEach((file) => {
            const fileExtension = file.originalname.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                isValid = false;
            }
        });

        if (!isValid) {
            throw new Error("Invalid image format. Use jpg, jpeg, or png.");
        }

        return true;
    }),
];

exports.validateProductFormUpdate = [
    body("sku").notEmpty().withMessage("SKU is required"),
    body("productName").notEmpty().withMessage("Product Name is required"),
    body("categories").isArray({ min: 1 }).withMessage("Categories is required"),
    body("shortDescription").notEmpty().withMessage("Short Description is required"),
    body("longDescription").notEmpty().withMessage("Long Description is required"),
    body("price").isNumeric().withMessage("Price must be a numeric value"),
    body("discountPrice").isNumeric().withMessage("Discount Price must be a numeric value"),
    body("quantity").isInt().withMessage("Quantity must be an integer value"),
    body("options").custom(validateOptions),
    body("active").isBoolean().withMessage("Active must be a boolean value"),
];
