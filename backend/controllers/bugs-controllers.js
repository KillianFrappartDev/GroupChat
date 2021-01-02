// Local Imports
const Bug = require('../models/bug');
const User = require('../models/user');

const fetch = async (req, res, next) => {};

const report = async (req, res, next) => {
  const { id, title, description } = req.body;

  // Find user
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return next(new Error('[ERROR][BUGS] Could not find user by id: ' + error));
  }

  // Create a bug
  const bug = new Bug({ title, description, user });

  // Save bug
  try {
    await bug.save();
  } catch (error) {
    return next(new Error('[ERROR][BUGS] Could not create bug: ' + error));
  }

  // Send response
  res.json({
    message: '[BUGS][CREATE] Bug reported..'
  });
};

exports.fetch = fetch;
exports.report = report;
