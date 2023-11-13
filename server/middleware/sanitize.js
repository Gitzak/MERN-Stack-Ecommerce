const xss = require("xss");

exports.sanitize = (req, res, next) => {
    // Sanitize the specified fields using xss
    const sanitizeFields = ["firstName", "lastName", "email", "role", "userName", "password"];
    for (const field of sanitizeFields) {
        if (req.body[field]) {
            req.body[field] = xss(req.body[field]);
        }
    }

    next();
};
