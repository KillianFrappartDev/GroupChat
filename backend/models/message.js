const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true },
  image: { type: String, required: true },
  text: { type: String, required: true },
  group: { type: mongoose.Types.ObjectId, required: true, ref: 'Group' },
  date: { type: String, required: true }
});

module.exports = mongoose.model('Message', schema);
