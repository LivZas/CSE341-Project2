const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Store'] 

    try {
         const result = await mongodb.getDatabase().db().collection('store').find();
        
        const stores = await result.toArray();

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(stores);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
    
const getSingle = async (req, res) => {
    //#swagger.tags=['Store']

    try {

    const storeId = new ObjectId(req.params.id);

    const result = await mongodb.getDatabase().db().collection('store').find({ _id: storeId });

    const stores = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(stores[0]);

     } catch (err) {
        res.status(500).json(err.message);
     }
};

const createStore = async (req, res) => {
    //#swagger.tags=['Store']

    try {

        const store = {
        storeName: req.body.storeName,
        location: req.body.location,
        owner: req.body.owner,
        employees: req.body.employees
        };

    const response = await mongodb.getDatabase().db().collection('store').insertOne(store);
    
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the store.');
    }

    } catch (err) {
        res.status(500).json(err.message);
    }
}; 

const updateStore = async (req, res) => {
    //#swagger.tags=['Store']

    try { 
        const storeId = new ObjectId(req.params.id);

        const store = {
            storeName: req.body.storeName,
            location: req.body.location,
            owner: req.body.owner,
            employees: req.body.employees
        };

        const response = await mongodb.getDatabase().db().collection('store').replaceOne({ _id: storeId }, store);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('Error updating the store.');
        }
        } catch (err) {
        res.status(500).json(err.message);
        }
    };

    const deleteStore = async (req, res) => {
        //#swagger.tags=['Store']

        try {
            const storeId = new ObjectId(req.params.id);

            const response = await mongodb.getDatabase().db().collection('store').deleteOne({ _id: storeId });

            if (response.deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(500).json('Error deleting the store.');
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    };

    module.exports = {
        getAll,
        getSingle,
        createStore,
        updateStore,
        deleteStore
    };