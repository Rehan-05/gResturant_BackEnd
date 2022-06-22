const mongoose = require("mongoose");


const UserSchema=new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact_number: Number,
  party_support:String
})

const User = mongoose.model(
  "User",
  UserSchema
);

module.exports = {
  User
};
