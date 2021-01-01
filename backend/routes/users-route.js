const express = require('express');

// Local Imports
const controllers = require('../controllers/users-controllers');

const router = express.Router();

router.post('/login', controllers.login);
router.post('/signup', controllers.signup);
router.post('/edit', controllers.edit);
router.post('/guest', controllers.guest);
router.post('/verify', controllers.verify);

module.exports = router;
