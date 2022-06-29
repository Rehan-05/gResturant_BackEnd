const mongoose = require("mongoose");
const Validator = require("validator");

const MenuSchema=new mongoose.Schema({

  Res_BranchID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant_Branch",
  },
  DishName: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },

  DishPrice: {
    type: Number,
    required: true,
  },
  DishDesc: {
    type: String,
    minlength: [3, "Phone number must be at least 10 characters long"],
    maxlength: [40, "Phone number must be at most 10 characters long"],
  },
  DishImage: {
    type: String,
  }
})

const Menu = mongoose.model(
  "Menu",
  MenuSchema
);

module.exports = {
    Menu
};
