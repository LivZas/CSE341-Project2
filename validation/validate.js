const { validationResult } = require('express-validator');

const validate = (req, rest, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];

    errors.array().map(err => 
        extractedErrors.push({ [err.path]: err.msg })
    );

    return rest.status(400).json({
        errors: extractedErrors
    });
};

module.exports = {
    validate
};