const mongoose = require("mongoose");
const Validator = require("validator");

const MenuSchema=new mongoose.Schema({
  DishName: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  DishPrice: {
    type: Number,
    required: true,
    minlength: [3, "Address must be at least 3 characters long"],
    maxlength: [50, "Address must be at most 50 characters long"],
  },
  DishDesc: {
    type: String,
    required: true,
    minlength: [3, "Phone number must be at least 10 characters long"],
    maxlength: [40, "Phone number must be at most 10 characters long"],
  },
})

const Menu = mongoose.model(
  "Menu",
  MenuSchema
);

module.exports = {
    Menu
};
