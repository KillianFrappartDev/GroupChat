// Local Imports
const Group = require('../models/group');

const fetchGroups = async (req, res, next) => {
  let groups;
  try {
    groups = await Group.find();
  } catch (error) {
    return next(new Error('[ERROR][GROUPS] Could not fetch groups: ' + error));
  }

  res.json({ message: 'Groups Fetched', groups });
};

const fetchGroupData = async (req, res, next) => {
  res.json({ message: 'fetchGroupData' });
};

const createGroup = async (req, res, next) => {
  const { title, description } = req.body;

  // Create Group
  const newGroup = new Group({ title, description, members: [], messages: [] });
  try {
    await newGroup.save();
  } catch (error) {
    return next(new Error('[ERROR][GROUPS] Could not save group to DB: ' + error));
  }

  // Send Response
  res.json({ message: 'Group Created!' });
};

exports.fetchGroups = fetchGroups;
exports.fetchGroupData = fetchGroupData;
exports.createGroup = createGroup;
