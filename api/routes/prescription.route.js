var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator');

const Prescription = require('../models/prescription.model');


router.get('/', async(req, res) => {
    try {
        const prescription = await Prescription.find();
        res.json(prescription);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const patient = await Patient.findById(id);
        res.json(patient);
    } catch (err) {
        console.log(err);
        res.status(500).send(error);
    }
});
router.post('/', async(req, res) => {
    try {
        const newPresc = new Prescription(req.body);
        const presc = await newPresc.save();
        res.json(presc);
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
        await Prescription.findByIdAndUpdate(req.params.id, req.body);
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
        await Prescription.findByIdAndUpdate(req.params.id, req.body);
        res.send(responseObject);
    } catch (error) {
        res.status(500).send(error)
    }
});
router.delete('/:id', async(req, res) => {
    try {
        const presc = await Prescription.findById(req.params.id);
        if (!presc) {
            return res.status(404).json({ msg: 'presc inexistant' });
        }
        await presc.remove();
        return res.json("deleted");

    } catch (error) {
        res.status(500).send(error)

    }
});
router.delete('/', async(req, res) => {
    try {
        await Prescription.remove({});
        return res.json("All deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});





module.exports = router;