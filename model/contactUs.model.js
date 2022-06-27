const mongoose = require("mongoose");
const { getMaxListeners } = require("../app");


const ContactSchema=new mongoose.Schema({
  Person_type: String,
  Name: String,
  Email: String,
  Des: String,
})


const Contact = mongoose.model(
  "Contact",
  ContactSchema
);

module.exports = {
    Contact
};
