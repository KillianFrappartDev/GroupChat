const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  date: { type: String, required: true },
  content: { type: String, required: true },
  context: { type: mongoose.Types.ObjectId, required: true, ref: 'Group' }
});

module.exports = mongoose.model('Message', schema);
