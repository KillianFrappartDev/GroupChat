const fetchGroups = async (req, res, next) => {
  res.json({ message: 'fetchGroups' });
};

const fetchGroupData = async (req, res, next) => {
  res.json({ message: 'fetchGroupData' });
};

const createGroup = async (req, res, next) => {
  res.json({ message: 'createGroup' });
};

exports.fetchGroups = fetchGroups;
exports.fetchGroupData = fetchGroupData;
exports.createGroup = createGroup;
