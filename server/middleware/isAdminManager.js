const CONSTANTS = require("../constants/index");
const { verify } = require("../utils/JWT");

exports.isAdminManager = (req, res, next) => {
  // console.log(req.path);
  // console.log(req.params.id);
  const authHeader = req.headers.authorization || null;

  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.json({
      message: CONSTANTS.ROUTE_NOT_FOUND,
      status: CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE,
    });
  }

  const userData = verify(token);
  req.userRole = userData.userRole;
  
  if (req.userRole !== "ADMIN" && req.userRole !== "MANAGER") {
    return res.json({
      message: CONSTANTS.INSUFFICIENT_PRIVILEGE,
      status: CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE,
    });
  }

  next();
};
