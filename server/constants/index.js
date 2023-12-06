exports.ROLES_USER = {
    Admin: "ADMIN",
    Manager: "MANAGER",
};

exports.ORDERS_STATUS = {
    Open   : "Open",
    Shipped: "Shipped",
    Paid   : "Paid",
    Closed : "Closed",
    Cancelled: "Cancelled",
};
exports.ORDERS_STATUS_MSG = {
    Shipped  : "We're excited to inform you that your order has been shipped. You can expect it to arrive at your doorstep soon!",
    Paid     : "Thank you for your payment! We've received it and your order is now being processed. You'll receive a notification once it's shipped.",
    Closed   : "Your order has been successfully delivered and marked as closed. We hope you enjoy your purchase! If you have any questions, feel free to reach out.",
    Cancelled: "We're sorry to inform you that your order has been cancelled. If you have any questions or need further assistance, please contact our support team."
};



exports.ORDERS_TVA = 0.2;

/* HTTP status code constant starts */
module.exports.SERVER_OK_HTTP_CODE          = 200;
module.exports.SERVER_CREATED_HTTP_CODE     = 201;
module.exports.SERVER_UPDATED_HTTP_CODE     = 204;
module.exports.SERVER_DELETED_HTTP_CODE     = 204;
module.exports.SERVER_BAD_REQUEST_HTTP_CODE = 400;
module.exports.SERVER_INVALID_CREDENTIALS   = 401;
module.exports.SERVER_FORBIDDEN_HTTP_CODE   = 403;
module.exports.SERVER_NOT_FOUND_HTTP_CODE   = 404;
module.exports.SERVER_ERROR_HTTP_CODE       = 500;
module.exports.SERVER_NOT_ALLOWED_HTTP_CODE = 503;

/* User API Success & Error Messages */
module.exports.USER_REGISTRATION_OK     = "User registration successful.";
module.exports.USER_REGISTRATION_FAILED = "User registration unsuccessful.";
module.exports.USER_LOGIN_OK            = "Login success.";
module.exports.USER_LOGIN_FAILED        = "User not found.";
module.exports.USER_FOUND               = "Users founds.";
module.exports.USER_CREATED             = "User Created successfully.";
module.exports.USER_UPDATED             = "User Updated successfully.";
module.exports.USER_UPDATED_PASSWORD    = "Password Updated successfully.";
module.exports.USER_DELETED             = "User Deleted successfully.";
module.exports.ALREADY_USER_DELETED     = "No User Deleted";
module.exports.USER_NOT_ACTIVE          = "Your account is not active";
module.exports.INVALID_USER_ID          = "Invalid user ID.";

/* Customer API Success & Error Messages */
module.exports.CUSTOMER_LOGIN_OK               = "Login success";
module.exports.CUSTOMER_LOGIN_FAILED           = "Customer not found.";
module.exports.CUSTOMER_ACCOUNT_VALIDATED      = "Customer account validated successfully";
module.exports.INVALID_EMAIL_ALREADY_VALIDATED = "Invalid action, this email is already validated";
module.exports.CUSTOMER_CREATED                = "Customer Created successfully.";
module.exports.CUSTOMER_UPDATED                = "Customer Updated successfully.";
module.exports.CUSTOMER_DELETED                = "Customer Deleted successfully.";
module.exports.ALREADY_CUSTOMER_DELETED        = "No Customer Deleted";
module.exports.CUSTOMER_NOT_ACTIVE             = "Your account is not active";
module.exports.INVALID_CUSTOMER_ID             = "Invalid customer ID.";
module.exports.CUSTOMER_PROFILE_UPDATED        = "Profile updated successfully";
module.exports.CUSTOMER_NOT_VALID              = "Check your email to validate your account ";

/* Category API Success & Error Messages */
module.exports.CATEGORY_CREATED_SUCCESS   = "Category created successfully";
module.exports.CATEGORY_UPDATED_SUCCESS   = "Category updated successfully";
module.exports.CATEGORY_DELETED_SUCCESS   = "Category deleted successfully";
module.exports.CATEGORY_NOT_FOUND         = "Category not found";
module.exports.CATEGORY_PARENT_NOT_FOUND  = "Category parent not found";
module.exports.INVALID_CATEGORY_ID        = "Invalid category ID";
module.exports.CATEGORY_HAS_SUBCATEGORIES = "Subcategories attached, cannot delete this category";

/* subCategory API Success & Error Messages */
module.exports.SUBCATEGORY_CREATED_SUCCESS = "subcategory created successfully";
module.exports.SUBCATEGORY_UPDATED_SUCCESS = "subcategory updated successfully";
module.exports.SUBCATEGORY_DELETED_SUCCESS = "subcategory deleted successfully";
module.exports.SUBCATEGORY_NOT_FOUND       = "subcategory not found";
module.exports.INVALID_SUBCATEGORY_ID      = "Invalid category ID";
module.exports.SUBCATEGORY_HAS_PRODUCTS    = "Sproducts attached, cannot delete this subcategory";

/* Product API Success & Error Messages */
module.exports.PRODUCT_CREATED_SUCCESS = "Product created successfully";
module.exports.PRODUCT_UPDATED_SUCCESS = "Product updated successfully";
module.exports.PRODUCT_DELETED_SUCCESS = "Product deleted successfully";
module.exports.PRODUCT_DUPLICATE_KEY   = (field) => `The ${field} you provided is already in use. Please choose a different ${field}`;
module.exports.PRODUCT_NOT_FOUND       = "Product not found";
module.exports.PRODUCT_NO_CHANGE_MADE  = "No changes were made to the product";
module.exports.INVALID_PRODUCT_ID      = "Invalid Product ID";

/* Order API Success & Error Messages */
module.exports.ORDER_CREATED_SUCCESS        = "Order created successfully";
module.exports.ORDER_UPDATED_SUCCESS        = "Order updated successfully";
module.exports.ORDER_STATUS_UPDATED_SUCCESS = "order status updated successfully";
module.exports.ORDER_NOT_FOUND              = "Order not found";
module.exports.INVALID_ORDER_ID             = "Invalid Order ID";
module.exports.ORDER_STATUS_NOT_FOUND       = "Order Status not found";

/* General Errors  constants start */
module.exports.ROUTE_NOT_FOUND        = "You are at wrong place. Shhoooo...";
module.exports.SERVER_ERROR           = "Something bad happened please try again";
module.exports.INSUFFICIENT_PRIVILEGE = "You don't have enough privilege";
module.exports.INVALID_CREDENTIALS    = "Invalid credentials";

// Mail related messages
module.exports.EMAIL_SEND_ERROR   = "Error sending email";
module.exports.EMAIL_SEND_SUCCESS = "Email sent successfully";
