const express = require('express');

// Local Imports
const controllers = require('../controllers/messages-controllers');

const router = express.Router();

router.get('/:gid', controllers.fetchMessages);
router.post('/', controllers.sendMessage);

module.exports = router;
