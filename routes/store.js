const express = require('express');
const router = express.Router();

const storeController = require('../controllers/store');

const { storeValidationRules } = require('../validation/storeValidation');
const { validate } = require('../validation/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', storeController.getAll);
router.get('/:id', storeController.getSingle);

router.post('/', 
    isAuthenticated,
    storeValidationRules(), 
    validate, 
    storeController.createStore);

router.put('/:id', 
    isAuthenticated,
    storeValidationRules(), 
    validate, 
    storeController.updateStore);

router.delete('/:id',
    isAuthenticated, 
    storeController.deleteStore);

module.exports = router;