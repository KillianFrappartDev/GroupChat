const express = require('express');

// Local Imports
const controllers = require('../controllers/groups-controllers');

const router = express.Router();

router.get('/', controllers.fetchGroups);
router.get('/:gid', controllers.fetchGroupData);
router.post('/', controllers.createGroup);

module.exports = router;
