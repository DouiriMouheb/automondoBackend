const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({

    name: String,
    model:String,
    description:String,
    prix:String,
    image1:String,
	image2:String,
  image3:String,
	image4:String,

    
});

const FileModel = mongoose.model("file",fileSchema);

module.exports = FileModel