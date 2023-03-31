//Load env variabels
require('dotenv').config()

const mongoose = require('mongoose');

async function connectToDB(){
  try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected To DataBase")
  }
  catch(err){
    console.log(err)
  }
  
}

module.exports = connectToDB;