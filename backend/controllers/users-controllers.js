const bcrypt = require('bcryptjs');

// Local Imports
const User = require('../models/user');
const { createToken, checkToken } = require('../utils/token');

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
  if (!user) res.json({ message: '[USER][LOGIN] Access denied, incorrect Email.', access: false });

  // Decrypt password & Check if password is valid
  const decryptedPassword = await bcrypt.compare(password, user.password);
  if (!decryptedPassword) res.json({ message: '[USER][LOGIN] Access denied, incorrect Password.', access: false });

  // If Checked is true, create token
  let token = null;
  if (checked) token = await createToken(user.id);

  // Send response
  res.json({
    message: '[USER][LOGIN] Access granted.',
    access: true,
    user: { id: user.id, username: user.username, image: user.image, token }
  });
};

const signup = async (req, res, next) => {
  const { checked, email, password, username } = req.body;
  const defaultImage;

  // Check if user with this email already exists
  const existingUser = findUserWithEmail(email);
  if (existingUser) res.json({ message: '[USER][SIGNUP] Access denied, email already used.', access: false });

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 8);

  // Create new user
  const newUser = new User({ email, password: hashedPassword, username, image: defaultImage });

  // If Checked is true, create token
  let token = null;
  if (checked) token = await createToken(user.id);

  // Send response
  res.json({
    message: '[USER][SIGNUP] Access granted.',
    access: true,
    user: { id: newUser.id, username: newUser.username, image: newUser.image, token }
  });
};

exports.login = login;
exports.signup = signup;
