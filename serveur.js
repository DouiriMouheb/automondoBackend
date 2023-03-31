//Load env variabels
require("dotenv").config();
let fs = require('fs');
let dir = './uploads';
//import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDB");
const carsController = require("./controllers/carsController")
const cors= require('cors');
 const bodyParser = require('body-parser');
const path = require("path");
const multer = require("multer");
const FileModel = require("./models/car")
//create an express app
const app = express();
let upload = multer({
  storage: multer.diskStorage({

    destination: (req, file, callback) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, './uploads');
    },
    filename: (req, file, callback) => { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

  }),

  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(/*res.end('Only images are allowed')*/ null, false)
    }
    callback(null, true)
  }
});
const obj =(req,res,next) => {
  try {    
     upload(req, res,  () => {
         next();
      });
 
  } catch (error) {
     console.log(error)  
  }
 }

//config express app
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//connect to Db
connectToDb();

//routing

app.post("/car",carsController.createCar );
app.get("/cars", carsController.fetchCars);
app.get("/cars/:id",carsController.getCarById );
app.put("/cars/:id",carsController.updateCar );
app.delete("/cars/:id" , carsController.deleteCar);

app.post('/upload', upload.any(), async (req, res) => {
  try {
    if (!req.body && !req.files) {
      res.json({ success: false });
    } else {
      let car = new FileModel({
        name: req.body.name,
        model: req.body.model,
        description: req.body.description,
        prix: req.body.prix,
        image1: req.files[0] && req.files[0].filename ? req.files[0].filename : '',
        image2: req.files[1] && req.files[1].filename ? req.files[1].filename : '',
        image3: req.files[2] && req.files[2].filename ? req.files[2].filename : '',
        image4: req.files[3] && req.files[3].filename ? req.files[3].filename : '',
      }); 

      const savedCar = await FileModel.create(
       car
      );
      
      res.json({savedCar});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});


//start serveur
app.use("/uploads",express.static(path.join(__dirname, "./uploads/")));
app.listen(process.env.PORT);
