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
        .withMessage('Quantity must be an integer')
    ];
};

module.exports = {
    inventoryValidationRules
};