const express = require('express');
const { body } = require('express-validator');

// Local Imports
const controllers = require('../controllers/groups-controllers');

const router = express.Router();

router.get('/:gid', controllers.fetchGroupData);
router.get('/', controllers.fetchGroups);
router.post('/', body('title').isLength({ min: 3, max: 12 }), controllers.createGroup);

module.exports = router;
