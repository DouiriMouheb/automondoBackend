const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
  name: String,
  model:String,
  description:String,
  prix:String,
  
});
const Car = mongoose.model('Car', carSchema);
module.exports = Car;