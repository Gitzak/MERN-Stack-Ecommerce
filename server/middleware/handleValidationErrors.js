const { validationResult } = require("express-validator");

exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    req.validationErrors = [];

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};
