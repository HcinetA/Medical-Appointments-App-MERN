var express = require('express');
var router = express.Router();
var express = require('express');
const { validationResult } = require('express-validator');
var mongoose = require('mongoose');
const User = require('../models/user.model');
const Appointment = require('../models/appointment.model');


router.get('/', async(req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const appointment = await Appointment.findById(id);
        res.json(appointment);
    } catch (err) {
        console.log(err);
        res.status(500).send(error);
    }
});

router.get('/patient/:patient_id', async(req, res) => {
    try {
        const patient_id = req.params.patient_id;
        const appointments = await Appointment.find({ patient: patient_id });
        res.json(appointments);
    } catch (err) {
        console.log(err);
        res.status(500).send(error);
    }
});

router.get('/doctor/:user_id', async(req, res) => {
    try {
        const doctor_id = req.params.user_id;
        const appointments = await Appointment.find({ doctor: doctor_id });
        res.json(appointments);
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
        const newAppointment = new Appointment({
            daySchedule: req.body.daySchedule,
            date: req.body.date,
            time: req.body.time,
            doctor: req.body.doctor,
            patient: req.body.patient,
            acte: req.body.acte,
            notes: req.body.notes,
            honoraire: req.body.honoraire
        });

        const appointment = await newAppointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async(req, res) => {
    let responseObject = {
        sucess: true,
        updated_element: req.body
    };
    try {
        await Appointment.findByIdAndUpdate(req.params.id, req.body);
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
        await Appointment.findByIdAndUpdate(req.params.id, req.body);
        res.send(responseObject);

    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ msg: 'appointment inexistant' });
        }
        await Appointment.findOneAndRemove(appointment);
        return res.json("deleted");

    } catch (error) {
        res.status(500).send(error)

    }
});
router.delete('/', async(req, res) => {
    try {
        await Appointment.remove({});
        return res.json("All deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router