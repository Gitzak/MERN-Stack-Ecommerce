const { validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    req.validationErrors = [];

    if (!errors.isEmpty()) {
        req.validationErrors = errors.array();
        return next();
    }

    next();
};
