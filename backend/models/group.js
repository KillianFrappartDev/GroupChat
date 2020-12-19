const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Message' }]
});

module.exports = mongoose.model('Group', schema);
