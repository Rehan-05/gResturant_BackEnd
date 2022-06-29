const mongoose = require("mongoose");
const Validator = require("validator");

const RestaurantBrand_Schema=new mongoose.Schema({
  // Res_Brand_id:{
  //   type:Number,
  //   required:true,
  // },
  Res_BrandName: {
    type: String,
    // required: true,
    // minlength: [3, "Name must be at least 3 characters long"],
    // maxlength: [50, "Name must be at most 50 characters long"],
  },

  Res_BrandLogo: {
    data: Buffer, 
    contentType: String 
  },
})

const Restaurant_Brand = mongoose.model(
  "Restaurant_Brand",
  RestaurantBrand_Schema
);

module.exports = {
  Restaurant_Brand
};
