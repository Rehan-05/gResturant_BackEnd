const mongoose = require("mongoose");
const Validate = require("validator");



const UserSchema=new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 3 characters long"],
    maxlength: [50, "Email must be at most 50 characters long"],
    validate: {
      validator: function (value) {
        return Validate.isEmail(value);
      }
    }
  },
  password: {
    type: String,
    required: true,
  },
  
})

const User = mongoose.model(
  "User",
  UserSchema
);

module.exports = {
  User
};
