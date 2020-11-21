var express = require('express');
var router = express.Router();
// const { validationResult } = require('express-validator');
const Role = require('../models/role.model');

router.get('/', async(req, res) => {
    try {
        const roles = await Role.find().populate('appointment', ['daySchedule', 'date']);
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const role = await Role.findById(id);
        res.json(role);
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
        const newRole = new Role(req.body);
        const role = await newRole.save();
        res.json(role);
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
        await Role.findByIdAndUpdate(req.params.id, req.body);
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
        await Role.findByIdAndUpdate(req.params.id, req.body);
        res.send(responseObject);

    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ msg: 'role inexistante' });
        }
        await Role.remove();
        return res.json("deleted");

    } catch (error) {
        res.status(500).send(error)

    }
});

router.delete('/', async(req, res) => {
    try {
        await Role.remove({});
        return res.json("All deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;