const { check, validationResult } = require('express-validator');

module.exports.savePatientCheck = [
    check('phone', 'Numéro de telephone est obligatoire').exists()
]