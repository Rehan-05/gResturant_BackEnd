const mongoose = require("mongoose");
const Validator = require("validator");

const RestaurantBranch_Schema=new mongoose.Schema({

  Res_BrandID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  Res_BranchName: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },

  Res_BranchAddress: {
    type: String,
    required: true,
    minlength: [3, "Address must be at least 3 characters long"],
    maxlength: [50, "Address must be at most 50 characters long"],
  },
  startTime: {
    type: String,
    required:true
  },

  endTime: {
   type:String,
   required:true
  },

})

const Restaurant_Branch = mongoose.model(
  "Restaurant_Branch",
  RestaurantBranch_Schema
);

module.exports = {
    Restaurant_Branch
};
