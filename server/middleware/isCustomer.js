const CONSTANTS = require("../constants/index");
const { verify } = require("../utils/JWT");

exports.isCustomer = (req, res, next) => {
  const authHeader = req.headers.authorization || null;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      message: CONSTANTS.ROUTE_NOT_FOUND,
      status: CONSTANTS.SERVER_ERROR_HTTP_CODE,
    });
  }

  const userData = verify(token);
  req.userRole = userData.userRole;
  req.id = userData.customerId;
  if (req.userRole !== "CUSTOMER") {
    return res.json({
      message: CONSTANTS.SERVER_IFORBIDDEN_HTTP_CODE,
      status: CONSTANTS.INSUFFICIENT_PRIVILEGE_MESSAGE,
    });
  }

  next();
};