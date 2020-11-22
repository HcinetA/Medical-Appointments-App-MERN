var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
const Patient = require('../models/patient.model');
const Appointment = require('../models/appointment.model');

const User = require('../models/user.model');

const patientChecker = require('../middleware/patient-checker');

router.get('/', async(req, res) => {
    try {
        const patients = await Patient.find().populate('appointments');
        res.json(patients);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const patient = await Patient.findById(id).populate('appointments');
        res.json(patient);
    } catch (err) {
        console.log(err);
        res.status(500).send(error);
    }
});

router.post('/', patientChecker.savePatientCheck, async(req, res) => {
    try {
        const phone = req.body.phone;
        const already_exists_patient = await Patient.find({ 'phone': phone });
        console.log(already_exists_patient);
        if (already_exists_patient.length > 0) {
            return res.status(400).json("Un autre patient possede le meme numero de telephone ")
        } else {
            const patient = new Patient(req.body);
            const saved_patient = await patient.save();
            res.json(saved_patient);
        }
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