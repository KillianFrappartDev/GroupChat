const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Bug', schema);
