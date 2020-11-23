var express = require('express');
var router = express.Router();
const Invoice = require('../models/invoice.model');

router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const invoice = await Invoice.findById(id);
        res.json(invoice);
    } catch (err) {
        console.log(err);
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newInvoice = new Invoice(req.body);
        const invoice = await newInvoice.save();
        res.json(invoice);
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