const { body } = require('express-validator');
const CONSTANTS = require("../constants/index");

exports.validateUserLogin = [
    body('email', 'Email is required').notEmpty(),
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password is required').notEmpty(),
];

exports.validateUserForm = [
    body('role').notEmpty().withMessage('Role is required'),
    body('userName').notEmpty().withMessage('Username is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];

exports.validateUserFormUpdate = [
    body('role').notEmpty().withMessage('Role is required'),
    body('userName').notEmpty().withMessage('Username is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('active').isBoolean().withMessage('Active must be a boolean value'),
];

exports.validateCustomerLogin = [
    body('email', 'Email is required').notEmpty(),
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password is required').notEmpty(),
];

exports.validateCustomerForm = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];

exports.validateCustomerFormUpdatePut = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('active').isBoolean().withMessage('Active must be a boolean value'),
];

exports.validateCustomerFormUpdatePatch = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];

exports.validateCategoryForm = [
    body('category_name').notEmpty().withMessage('Category name is required'),
    body('active').isBoolean().withMessage('Active must be a boolean value'),
];

exports.validateCategoryFormUpdate = [
    body('category_name').notEmpty().withMessage('Category name is required'),
    body('active').isBoolean().withMessage('Active must be a boolean value'),
];

exports.validateSubCategoryForm = [
    body('subCategory_name').notEmpty().withMessage('Subcategory name is required'),
    body('category_id').notEmpty().withMessage('Category Parent is required'),
    body('active').isBoolean().withMessage('Active must be a boolean value'),
];

exports.validateSubCategoryFormUpdate = [
    body('subCategory_name').notEmpty().withMessage('Subcategory name is required'),
    body('category_id').notEmpty().withMessage('Category Parent is required'),
    body('active').isBoolean().withMessage('Active must be a boolean value'),
];

exports.validateProductForm = [
    body('sku').notEmpty().withMessage('SKU is required'),
    body('productName').notEmpty().withMessage('Product Name is required'),
    body('subcategoryId').notEmpty().withMessage('Subcategory ID is required'),
    body('shortDescription').notEmpty().withMessage('Short Description is required'),
    body('longDescription').notEmpty().withMessage('Long Description is required'),
    body('price').isNumeric().withMessage('Price must be a numeric value'),
    body('discountPrice').isNumeric().withMessage('Discount Price must be a numeric value'),
    body('quantity').isInt().withMessage('Quantity must be an integer value'),
    body('options').isArray().withMessage('Options must be an array'),
    body('active').isBoolean().withMessage('Active must be a boolean value'),
    // Multi Images Add
    body('images').custom((value, { req }) => {
        if (!req.files) {
            return true;
        }
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error('Invalid image format. Use jpg, jpeg, or png.');
        }
        return true;
    })
];

exports.validateProductFormUpdate = [
    body('sku').notEmpty().withMessage('SKU is required'),
    body('productName').notEmpty().withMessage('Product Name is required'),
    body('subcategoryId').notEmpty().withMessage('Subcategory ID is required'),
    body('shortDescription').notEmpty().withMessage('Short Description is required'),
    body('longDescription').notEmpty().withMessage('Long Description is required'),
    body('price').isNumeric().withMessage('Price must be a numeric value'),
    body('discountPrice').isNumeric().withMessage('Discount Price must be a numeric value'),
    body('quantity').isInt().withMessage('Quantity must be an integer value'),
    body('options').isArray().withMessage('Options must be an array'),
    body('active').isBoolean().withMessage('Active must be a boolean value'),
];


