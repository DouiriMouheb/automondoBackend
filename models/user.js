const mongoose = require('mongoose')
const User = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
});
const user = mongoose.model('user', User);
module.exports = user;