const mongoose = require('mongoose');

// Local Imports
const Message = require('../models/message');
const Group = require('../models/group');

const fetchMessages = async (req, res, next) => {
  const gid = req.params.gid;

  if (gid === '0') return next(new Error('[ERROR][MESSAGES] wrong group id: '));

  // Find group's messages
  const group = await Group.findById(gid).populate('messages');

  res.json({ message: 'Messages fetched!', messages: group.messages });
};

const sendMessage = async (req, res, next) => {
  const { gid, username, text, image } = req.body;

  // Find group
  let group;
  try {
    group = await Group.findById(gid);
  } catch (error) {
    return next(new Error('[ERROR][MESSAGES] Could not find group by id: ' + error));
  }

  // Create message
  const newMessage = new Message({
    username,
    text,
    image,
    group
  });

  // Transaction
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newMessage.save({ session: sess });
    group.messages.push(newMessage);
    await group.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new Error('[ERROR][MESSAGE] Message transaction failed: ', error));
  }

  // Send Response
  res.json({ message: 'Message sent!' });
};

exports.fetchMessages = fetchMessages;
exports.sendMessage = sendMessage;
