const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Inventory'] 

    try {
         const result = await mongodb.getDatabase().db().collection('inventory').find();
        
        const inventoryItem = await result.toArray();

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(inventoryItem);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
    
const getSingle = async (req, res) => {
    //#swagger.tags=['Inventory']

    try {

    const inventoryId = new ObjectId(req.params.id);

    const result = await mongodb.getDatabase().db().collection('inventory').find({ _id: inventoryId });

    const inventoryItem = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(inventoryItem[0]);

     } catch (err) {
        res.status(500).json(err.message);
     }
};

const createInventory = async (req, res) => {
    //#swagger.tags=['Inventory']

    try {

        const inventory = {
        itemName: req.body.itemName,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        color: req.body.color,
        company: req.body.company,
        stores: req.body.stores
        };

    const response = await mongodb.getDatabase().db().collection('inventory').insertOne(inventory);
    
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the inventory.');
    }

    } catch (err) {
        res.status(500).json(err.message);
    }
}; 

const updateInventory = async (req, res) => {
    //#swagger.tags=['Inventory']

    try { 
        const inventoryId = new ObjectId(req.params.id);

        const inventory = {
        itemName: req.body.itemName,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        color: req.body.color,
        company: req.body.company,
        stores: req.body.stores
        };

        const response = await mongodb.getDatabase().db().collection('inventory').replaceOne({ _id: inventoryId }, inventory);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('Error updating the inventory.');
        }
        } catch (err) {
        res.status(500).json(err.message);
        }
    };

    const deleteInventory = async (req, res) => {
        //#swagger.tags=['Inventory']

        try {
            const inventoryId = new ObjectId(req.params.id);

            const response = await mongodb.getDatabase().db().collection('inventory').deleteOne({ _id: inventoryId });

            if (response.deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(500).json('Error deleting the inventory.');
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    };

    module.exports = {
        getAll,
        getSingle,
        createInventory,
        updateInventory,
        deleteInventory
    };