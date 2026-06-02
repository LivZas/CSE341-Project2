const express = require ('express');
const router = express.Router();

const inventoryController = require('../controllers/inventory');

const { inventoryValidationRules } = require('../validation/inventoryValidation');
const { validate } = require('../validation/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getSingle);

router.post('/',
    isAuthenticated,
    inventoryValidationRules(),
    validate, 
    inventoryController.createInventory);

router.put('/:id', 
    isAuthenticated, 
    inventoryValidationRules(), 
    validate, 
    inventoryController.updateInventory);

router.delete('/:id',
    isAuthenticated,
    inventoryController.deleteInventory);

module.exports = router;