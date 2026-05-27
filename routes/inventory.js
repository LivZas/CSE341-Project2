const express = require ('express');
const router = express.Router();

const inventoryController = require('../controllers/inventory');

const { inventoryValidationRules } = require('../validation/inventoryValidation');

const { validate } = require('../validation/validate');

router.get('/', inventoryController.getAll);

router.get('/:id', inventoryController.getSingle);

router.post('/', inventoryValidationRules(), validate, inventoryController.createInventory);

router.put('/:id', inventoryValidationRules(), validate, inventoryController.updateInventory);

router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;