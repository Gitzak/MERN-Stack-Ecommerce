exports.ROLES_USER = {
    Admin: 'ADMIN',
    Manager: 'MANAGER',
};

/* HTTP status code constant starts */
module.exports.SERVER_ERROR_HTTP_CODE = 412;
module.exports.SERVER_NOT_ALLOWED_HTTP_CODE = 503;
module.exports.SERVER_OK_HTTP_CODE = 200;
module.exports.SERVER_CREATED_HTTP_CODE = 201;
module.exports.SERVER_UPDATED_HTTP_CODE = 204;
module.exports.SERVER_NOT_FOUND_HTTP_CODE = 404;
module.exports.SERVER_INTERNAL_ERROR_HTTP_CODE = 500;
module.exports.SERVER_IFORBIDDEN_HTTP_CODE = 403;
module.exports.SERVER_INVALID_CREDENTIALS = 401;
module.exports.SERVER_USER_INVALID_CREDENTIALS = "Invalid credentials";


/* Route related constants starts */
module.exports.USER_REGISTRATION_OK = 'User registration successful.';
module.exports.USER_REGISTRATION_FAILED = 'User registration unsuccessful.';
module.exports.USER_LOGIN_OK = 'User logged in.';
module.exports.USER_LOGIN_FAILED = 'User not found.';
module.exports.USER_FOUND = 'Users founds.';
module.exports.USER_CREATED = 'User Created Succefuly.';
module.exports.USER_UPDATED = 'User Updated Succefuly.';
module.exports.USER_DELETED = 'User Deleted Succefuly.';
module.exports.ALREADY_USER_DELETED = 'No User Deleted';
module.exports.USER_NOT_ACTIVE = 'Your account is not active';


/* Validation related  constants starts */
module.exports.PASSWORD_NOT_FOUND = 'password can\'t be empty.';
module.exports.USERNAME_NOT_FOUND = 'User name can\'t be empty.';
module.exports.USERLASTNAME_NOT_FOUND = 'User last name can\'t be empty.';
module.exports.USERID_NOT_FOUND = 'User Id can\'t be empty.';
module.exports.EMAIL_NOT_FOUND = 'Email can\'t be empty.';
module.exports.GENDER_NOT_FOUND = 'Gender can\'t be empty.';
module.exports.PASSWORD_NOT_FOUND = 'Password can\'t be empty.';
module.exports.USER_NOT_FOUND = 'User does not exits.';
module.exports.FIELD_EMPTY = 'All fields are required.';


/* General Errors  constants start */
module.exports.ROUTE_NOT_FOUND = 'You are at wrong place. Shhoooo...';
module.exports.SERVER_ERROR_MESSAGE = 'Something bad happend. It\'s not you, it\'s me.';