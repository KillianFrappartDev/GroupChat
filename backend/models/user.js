const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  image: { type: String, required: true }
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);
