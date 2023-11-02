const CONSTANTS = require("../constants/index");
const { verify } = require("../utils/JWT");

exports.isCustomer = (req, res, next) => {
    const authHeader = req.headers.authorization || null;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.json({
            message: CONSTANTS.ROUTE_NOT_FOUND,
            status: CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE,
        });
    }

    const userData = verify(token);

    req.userRole          = userData.userRole;
    req.id                = userData.customerId;
    req.customerFirstName = userData.customerFirstName;
    req.customerLastName  = userData.customerLastName;
    req.customerEmail     = userData.customerEmail;

    if (req.userRole !== "CUSTOMER") {
        return res.json({
            message: CONSTANTS.INSUFFICIENT_PRIVILEGE,
            status: CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE,
        });
    }

    next();
};
