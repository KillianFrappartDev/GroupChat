const bcrypt = require('bcryptjs');

// Local Imports
const User = require('../models/user');

const findUserWithEmail = async email => {
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not find user with email'));
  }
  return user;
};

const login = async (req, res, next) => {
  const { checked, email, password } = req.body;

  // Find User with email
  const user = findUserWithEmail(email);

  // Decrypt password & Check if password is valid
  const decryptedPassword = await bcrypt.compare(password, user.password);

  // If Checked is true, create token

  // Send response

  res.json({ message: 'login' });
};

const signup = async (req, res, next) => {
  const { checked, email, password, username } = req.body;

  // Check if user with this email already exists
  const existingUser = findUserWithEmail(email);

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 8);

  // Create new user

  // If Checked is true, create token

  // Send response

  res.json({ message: 'signup' });
};

exports.login = login;
exports.signup = signup;
