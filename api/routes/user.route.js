var express = require('express');
var router = express.Router();
// const { validationResult } = require('express-validator');
const User = require('../models/user.model');

router.get('/', async (req, res) => {
	try {
		const users = await User.find().populate('appointment', [
			'daySchedule',
			'date',
		]);
		res.json(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findById(id);
		res.json(user);
	} catch (err) {
		res.status(500).send(error);
	}
});
router.get('/byRole/:role', async (req, res) => {
	try {
		const _role = req.params.role;
		const docltors = await User.find({ role: _role });
		res.json(docltors);
	} catch (err) {
		res.status(500).send(error);
	}
});

module.exports = router;
