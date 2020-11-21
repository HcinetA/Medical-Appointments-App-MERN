var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator');
const Maladie = require('../models/maladie.model');

router.get('/', async(req, res) => {
    try {
        const maladies = await Maladie.find().populate('appointment', ['daySchedule', 'date']);
        res.json(maladies);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const maladie = await Maladie.findById(id);
        res.json(maladie);
    } catch (err) {
        console.log(err);
        res.status(500).send(error);
    }
});

router.post('/', async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newMaladie = new Maladie(req.body);
        const maladie = await newMaladie.save();
        res.json(maladie);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.put('/:id', async(req, res) => {
    let responseObject = {
        sucess: true,
        updated_element: req.body
    };
    try {
        await Maladie.findByIdAndUpdate(req.params.id, req.body);
        res.send(responseObject);
    } catch (error) {
        res.status(500).send(error)
    }
});
router.patch('/:id', async(req, res) => {
    let responseObject = {
        sucess: true,
        updated_element: req.body
    };
    try {
        await Maladie.findByIdAndUpdate(req.params.id, req.body);
        res.send(responseObject);

    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const maladie = await Maladie.findById(req.params.id);
        if (!maladie) {
            return res.status(404).json({ msg: 'maladie inexistante' });
        }
        await maladie.remove();
        return res.json("deleted");

    } catch (error) {
        res.status(500).send(error)

    }
});

router.delete('/', async(req, res) => {
    try {
        await Maladie.remove({});
        return res.json("All deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;