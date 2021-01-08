// Local Imports
const Group = require('../models/group');

const fetchGroups = async (req, res, next) => {
  // Fetch all groups
  let groups;
  try {
    groups = await Group.find().populate('members');
  } catch (error) {
    return next(new Error('[ERROR][GROUPS] Could not fetch groups: ' + error));
  }

  // Send Response
  res.json({ message: 'Groups Fetched!', groups });
};

const fetchGroupData = async (req, res, next) => {
  const id = req.params.gid;

  // Fetch group by id and populate members.
  let group;
  try {
    group = await Group.findById(id).populate('members messages');
  } catch (error) {
    return next(new Error('[ERROR][GROUPS] Could not fetch groups by id: ' + error));
  }

  const members = group.members.map(item => {
    return { _id: item._id, username: item.username, image: item.image };
  });

  // Send Response
  res.json({ message: 'Group fetched!', messages: group.messages, members });
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
