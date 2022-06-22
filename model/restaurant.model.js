const mongoose = require("mongoose");
const Validator = require("validator");

const RestaurantSchema=new mongoose.Schema({
  ResName: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  ResAddress: {
    type: String,
    required: true,
    minlength: [3, "Address must be at least 3 characters long"],
    maxlength: [50, "Address must be at most 50 characters long"],
  },
  ResPhoneNo: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    minlength: [10, "Phone number must be at least 10 characters long"],
    maxlength: [15, "Phone number must be at most 10 characters long"],
  },
})

const Restaurant = mongoose.model(
  "Restaurant",
  RestaurantSchema
);

module.exports = {
  Restaurant
};
