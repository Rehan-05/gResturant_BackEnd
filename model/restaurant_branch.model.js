const mongoose = require("mongoose");
const Validator = require("validator");

const RestaurantBranch_Schema=new mongoose.Schema({

  Res_BrandID:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  Res_BrandName: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },

  startTime: {
    type: Date,
    default: Date.now
  },

  endTime: {
    type: Date
  },

})

const Restaurant_Branch = mongoose.model(
  "Restaurant_Branch",
  RestaurantBranch_Schema
);

module.exports = {
    Restaurant_Branch
};
