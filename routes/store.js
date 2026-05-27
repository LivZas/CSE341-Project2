const express = require('express');
const router = express.Router();

const storeController = require('../controllers/store');

const { storeValidationRules } = require('../validation/storeValidation');

const { validate } = require('../validation/validate');

router.get('/', storeController.getAll);

router.get('/:id', storeController.getSingle);

router.post('/', storeValidationRules(), validate, storeController.createStore);

router.put('/:id', storeValidationRules(), validate, storeController.updateStore);

router.delete('/:id', storeController.deleteStore);

module.exports = router;