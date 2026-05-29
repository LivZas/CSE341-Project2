const { body } = require('express-validator');

const inventoryValidationRules = () => {
    return [
        body('itemName')
        .notEmpty()
        .withMessage('Item name is required'),

        body('category')
        .notEmpty()
        .withMessage('Category is required'),

        body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

        body('quantity')
        .isInt({ min: 0 })
        .withMessage('Quantity must be an integer'),

        body('color')
        .notEmpty()
        .withMessage('Color is required'),

        body('company')
        .notEmpty()
        .withMessage('Company is required'),

        body('stores')
        .isArray({ min: 1 })
        .withMessage('At least one store is required')
    ];
};

module.exports = {
    inventoryValidationRules
};