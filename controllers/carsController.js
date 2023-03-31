const Car = require("../models/cars");
const FileModel = require("../models/car")
const fetchCars = async (req, res) => {
  const cars = await FileModel.find();
  res.json({ cars });
};
const getCarById = async (req, res) => {
  //get id from url
  const carId = req.params.id;
  //find using id
  const car = await FileModel.findById(carId);
  res.json({ car });
};
const updateCar = async (req, res) => {
  //get id from url
  const carId = req.params.id;
  //get the data off req
  const { name, model, description, prix } = req.body;

  //find using id
  await FileModel.findByIdAndUpdate(carId, {
    name,
    model,
    description,
    prix,
  });
  //find updated car
  const car = await FileModel.findById(carId);
  res.json({ car });
};
const deleteCar = async (req, res) => {
  try {
    // get id of car
    const carId = req.params.id;
    //delete
    await FileModel.deleteOne({ _id: carId });
    //respond
    res.json({ success: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
const createCar = async (req, res) => {
  //Get data off request
  const { name, model, description, prix } = req.body;

  //Create a car
  const car = await Car.create({
    name,
    model,
    description,
    prix,
  });

  // send response
  res.json({ car });
};

module.exports = {
  fetchCars,
  getCarById,
  updateCar,
  deleteCar,
  createCar,
};
