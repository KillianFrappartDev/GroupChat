const bcrypt = require('bcryptjs');
const { AvatarGenerator } = require('random-avatar-generator');
const generator = new AvatarGenerator();

// Local Imports
const User = require('../models/user');
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
  if (!user) {
    res.json({ message: 'Access denied, incorrect Email.', access: false });
    return next();
  }

  // Decrypt password & Check if password is valid
  const decryptedPassword = await bcrypt.compare(password, user.password);
  if (!decryptedPassword) {
    res.json({ message: 'Access denied, incorrect Password.', access: false });
    return next();
  }

  // Create token
  let token = await createToken(user.id);

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
  if (existingUser) {
    res.json({ message: 'Access denied, email already used.', access: false });
    return next();
  }
  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 8);

  // Create new user.
  const newUser = new User({ email, password: hashedPassword, username, image: defaultImage });
  try {
    await newUser.save();
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not save user in DB: ' + error));
  }

  // Create token
  let token = await createToken(newUser.id);

  // Send response
  res.json({
    message: '[USER][SIGNUP] Access granted.',
    access: true,
    user: { id: newUser.id, username: newUser.username, image: newUser.image, token }
  });
};

const guest = async (req, res, next) => {
  const randomUsername = `Guest${Math.floor(Math.random() * 99999) + 1}`;
  const defaultImage = generator.generateRandomAvatar();

  // Create Guest
  const newGuest = new User({ username: randomUsername, image: defaultImage });
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

const verify = async (req, res, next) => {
  const { id, token } = req.body;

  // Find user with id
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not find user by id: ' + error));
  }

  // Verify Token
  const tokenIsValid = await checkToken(id, token);
  if (!tokenIsValid) {
    res.json({ message: '[USER][VERIFY] Access denied, invalid token.', access: false });
    return next();
  }

  // Send response
  res.json({
    message: '[USER][LOGIN] Access granted.',
    access: true,
    user: { id: user.id, username: user.username, image: user.image, token }
  });
};

const edit = async (req, res, next) => {
  const { id, username, image } = req.body;

  // Find user by id
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not find user by id: ' + error));
  }

  // Edit username and image
  user.username = username;
  user.image = image;

  // Save changes
  try {
    await user.save();
  } catch (error) {
    return next(new Error('[ERROR][USERS] Could not save user update: ' + error));
  }

  // Send response
  res.json({
    message: '[USER][EDIT] User updated.',
    access: true,
    user: { username: user.username, image: user.image }
  });
};

exports.login = login;
exports.signup = signup;
exports.edit = edit;
exports.guest = guest;
exports.verify = verify;
