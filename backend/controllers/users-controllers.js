const bcrypt = require('bcryptjs');
const { AvatarGenerator } = require('random-avatar-generator');
const generator = new AvatarGenerator();

// Local Imports
const User = require('../models/user');
const Guest = require('../models/guest');
const { createToken, checkToken } = require('../utils/token');

const findUserWithEmail = async email => {
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not find user with email: ', +error));
  }
  return user;
};

const login = async (req, res, next) => {
  const { checked, email, password } = req.body;

  // Find User with email
  const user = await findUserWithEmail(email);
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
  const defaultImage = generator.generateRandomAvatar();

  // Check if user with this email already exists
  const existingUser = await findUserWithEmail(email);
  if (existingUser) res.json({ message: '[USER][SIGNUP] Access denied, email already used.', access: false });

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 8);

  // Create new user.
  const newUser = new User({ email, password: hashedPassword, username, image: defaultImage });
  try {
    await newUser.save();
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not save user in DB: ' + error));
  }

  // If Checked is true, create token
  let token = null;
  if (checked) token = await createToken(newUser.id);

  // Send response
  res.json({
    message: '[USER][SIGNUP] Access granted.',
    access: true,
    user: { id: newUser.id, username: newUser.username, image: newUser.image, token }
  });
};

const guest = async (req, res, next) => {
  const randomUsername = `Guest${Math.floor(Math.random() * 99999) + 1}`;
  const defaultImage =
    'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3578&q=80';

  // Create Guest
  const newGuest = new Guest({ username: randomUsername, image: defaultImage });
  try {
    await newGuest.save();
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not save guest in DB: ' + error));
  }

  // Send response
  res.json({
    message: '[USER][GUEST] Access granted.',
    access: true,
    user: { id: newGuest.id, username: newGuest.username, image: newGuest.image }
  });
};

exports.login = login;
exports.signup = signup;
exports.guest = guest;
