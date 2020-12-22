const express = require('express');

// Local Imports
const controllers = require('../controllers/users-controllers');

const router = express.Router();

router.post('/login', controllers.login);
router.post('/signup', controllers.signup);

module.exports = router;
