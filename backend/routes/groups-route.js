const express = require('express');

// Local Imports
const controllers = require('../controllers/groups-controllers');

const router = express.Router();

router.get('/:gid', controllers.fetchGroupData);
router.get('/', controllers.fetchGroups);
router.post('/', controllers.createGroup);

module.exports = router;
