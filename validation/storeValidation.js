const { body } = require('express-validator');

const storeValidationRules = () => {
    return [
        body('storeName')
        .notEmpty()
        .withMessage('Store name is required'),

        body('location')
        .notEmpty()
        .withMessage('Store name is required'),

        body('owner')
        .notEmpty()
        .withMessage('Employees must be a number')
    ];
};

module.exports = {
    storeValidationRules
};