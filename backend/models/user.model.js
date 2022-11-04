const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  active: {type: Boolean},
  role: {type: String},
  last_connection: {type: Date}
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
