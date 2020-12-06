var express = require('express');
var router = express.Router();
var express = require('express');
const { validationResult } = require('express-validator');
var mongoose = require('mongoose');
const Patient = require('../models/patient.model');
const Appointment = require('../models/appointment.model');

router.get('/', async (req, res) => {
	try {
		const status = req.query.status;
		let appointments = [];
		if (status !== undefined) {
			if (status === 'false') {
				appointments = await Appointment.find({ status: false })
					.populate('patient', [
						'name',
						'phone',
						'allergie',
						'maladie',
						'antecedent',
						'city',
						'habitude',
						'job',
						'medication',
					])
					.populate('doctor');
			} else if (status === 'true') {
				appointments = await Appointment.find({ status: true })
					.populate('patient', [
						'name',
						'phone',
						'allergie',
						'maladie',
						'antecedent',
						'city',
						'habitude',
						'job',
						'medication',
					])
					.populate('doctor');
			}
		} else {
			appointments = await Appointment.find()
				.populate('patient', [
					'name',
					'phone',
					'allergie',
					'maladie',
					'antecedent',
					'city',
					'habitude',
					'job',
					'medication',
				])
				.populate('doctor');
		}

		res.json(appointments);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const appointment = await Appointment.findById(id)
			.populate('patient', [
				'name',
				'phone',
				'allergie',
				'maladie',
				'antecedent',
				'city',
				'habitude',
				'job',
				'medication',
			])
			.populate('doctor');
		res.json(appointment);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/by_patient_id/:patient_id', async (req, res) => {
	try {
		const patient_id = req.params.patient_id;
		const appointments = await Appointment.find({
			patient: patient_id,
		}).populate('doctor');
		res.json(appointments);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/doctor/:user_id', async (req, res) => {
	try {
		const doctor_id = req.params.user_id;
		const appointments = await Appointment.find({ doctor: doctor_id })
			.populate('patient')
			.populate('doctor', ['-password']);
		res.json(appointments);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post('/', async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const patient = await Patient.findById(req.body.patient);
		const app = {
			daySchedule: req.body.daySchedule,
			date: req.body.date,
			time: req.body.time,
			doctor: req.body.doctor,
			patient: req.body.patient,
			acte: req.body.acte,
			notes_consultation: req.body.notes_consultation,
			honoraire: req.body.honoraire,
			motif: req.body.motif,
			notes_acte: req.body.notes_acte,
			notes: req.body.notes,
		};
		const newAppointment = new Appointment(req.body);

		const appointment = await newAppointment.save();
		patient.appointments.push(appointment);
		const saved_patient = await patient.save();
		res.json(appointment);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.put('/:id', async (req, res) => {
	let responseObject = {
		sucess: true,
		updated_element: req.body,
	};
	try {
		await Appointment.findByIdAndUpdate(req.params.id, req.body);
		res.send(responseObject);
	} catch (error) {
		res.status(500).send(error);
	}
});
router.patch('/:id', async (req, res) => {
	let responseObject = {
		sucess: true,
		updated_element: req.body,
	};
	try {
		await Appointment.findByIdAndUpdate(req.params.id, req.body);
		res.send(responseObject);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const appointment = await Appointment.findById(req.params.id);
		if (!appointment) {
			return res.status(404).json({ msg: 'appointment inexistant' });
		}
		const deleted = await appointment.remove();
		return res.json(deleted);
	} catch (error) {
		res.status(500).send(error);
	}
});
router.delete('/', async (req, res) => {
	try {
		await Appointment.remove({});
		return res.json('All deleted');
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
