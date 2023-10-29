const CONSTANTS = require("../constants/index");
const { verify } = require("../utils/JWT");

exports.isAdminManager = (req, res, next) => {
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

  if (req.userRole !== "ADMIN" && req.userRole !== "MANAGER") {
    return res.json({
      message: CONSTANTS.SERVER_IFORBIDDEN_HTTP_CODE,
      status: CONSTANTS.INSUFFICIENT_PRIVILEGE_MESSAGE,
    });
  }

  next();
};
