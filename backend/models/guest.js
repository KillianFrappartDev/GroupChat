const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Guest', schema);
