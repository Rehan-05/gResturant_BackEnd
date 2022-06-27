const mongoose = require("mongoose");



const SettingsSchema=new mongoose.Schema({
  Notifications:String,
  Location: String 
})


const Settings = mongoose.model(
  "Settings",
  SettingsSchema
);

module.exports = {
    Settings
};
