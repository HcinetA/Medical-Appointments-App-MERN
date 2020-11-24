var express = require('express');
var router = express.Router();
const Invoice = require('../models/invoice.model');
const Patient = require('../models/patient.model');

router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('patient');
        res.json(invoices);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const invoice = await Invoice.findById(id).populate('patient');
        res.json(invoice);
    } catch (err) {
        console.log(err);
        res.status(500).send(error);
    }
});

router.get('/by_patient_id/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const invoice = await Invoice.find({ patient: id }).populate('patient');
        res.json(invoice);
    } catch (err) {
        console.log(err);
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const patient_id = req.body.patient;
        if (patient_id) {
            const patient = await Patient.findById(req.body.patient);
            const inv = {
                paid: req.body.paid,
                reste: req.body.reste,
                note_assistante: req.body.note_assistante,
                patient: req.body.patient,
                total: req.body.total,
                acte: req.body.acte
            }
            const newInvoice = new Invoice(inv);
            const invoice = await newInvoice.save();
            patient.invoices.push(invoice)
            const saved_patient = await patient.save();
            res.json(invoice);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    let responseObject = {
        sucess: true,
        updated_element: req.body
    };
    try {
        await Invoice.findByIdAndUpdate(req.params.id, req.body);
        res.send(responseObject);
    } catch (error) {
        res.status(500).send(error)
    }
});
router.patch('/:id', async (req, res) => {
    let responseObject = {
        sucess: true,
        updated_element: req.body
    };
    try {
        await Invoice.findByIdAndUpdate(req.params.id, req.body);
        res.send(responseObject);

    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ msg: 'Invoice inexistante' });
        }
        await Invoice.remove();
        return res.json("deleted");

    } catch (error) {
        res.status(500).send(error)

    }
});

router.delete('/', async (req, res) => {
    try {
        await Invoice.remove({});
        return res.json("All deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;