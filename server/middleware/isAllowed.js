const CONSTANTS = require('../constants/index')
const {verify} = require('../utils/JWT')



exports.isAllowed = (req,res,next) =>{

    const authHeader = req.headers.authorization || null;

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.json({
            message:CONSTANTS.ROUTE_NOT_FOUND,
            status:CONSTANTS.SERVER_ERROR_HTTP_CODE
        })
    }
    
    const userData = verify(token)

    console.log(userData)

    req.userName = userData.userName
    req.userId = userData.userId
    req.userRole = userData.userRole

    if(req.userRole !== "ADMIN") {
        return res.json({
            message:CONSTANTS.SERVER_IFORBIDDEN_HTTP_CODE,
            status:CONSTANTS.INSUFFICIENT_PRIVILEGE_MESSAGE
        })
    }

    next()

}