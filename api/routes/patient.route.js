var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator');
const Patient = require('../models/patient.model');
const User = require('../models/user.model');

router.get('/', async(req, res) => {
    try {
        const patients = await Patient.find().populate('appointment', ['daySchedule', 'date']);
        res.json(patients);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPatient = new Patient({
            name: req.body.name,
            phone: req.body.phone,
            age: req.body.age,
            information: req.body.information,
            user: req.user._id
        });
        if (req.body.appointment) {
            newPatient.appointments = req.body.appointment._id
        }
        const patient = await newPatient.save();
        res.json(patient);
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
        await Patient.findByIdAndUpdate(req.params.id, req.body);
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
        await Patient.findByIdAndUpdate(req.params.id, req.body);
        res.send(responseObject);

    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ msg: 'patient inexistant' });
        }
        await patient.remove();
        return res.json("deleted");

    } catch (error) {
        res.status(500).send(error)

    }
});
router.delete('/', async(req, res) => {
    try {
        await Patient.remove({});
        return res.json("All deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/:patient_id/:appointment_id', async(req, res) => {
    try {
        const patient = await Patient.findById(req.params.patient_id);
        if (!patient) {
            return res.status(400).json('patient inexistant')
        }
        const appointments = patient.appointments.find((app) => app._id === req.params.appointment_id);
        if (!appointments) {
            return res.status(400).json('rendez-vous inexistant')
        }

        patient.appointments = patient.appointments.filter(({ _id }) => { _id != req.params.appointment_id })
        await patient.save();
        return res.json(patient.appointments);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;