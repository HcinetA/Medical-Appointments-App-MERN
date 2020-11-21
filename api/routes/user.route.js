var express = require('express');
var router = express.Router();

const User = require('../models/user');
router.get('/', async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (user) {
        console.log(error);
        res.status(500).send(error);
    }
});
module.exports = router;