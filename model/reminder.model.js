const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Primary_election : Boolean,
  General_election: Boolean,
  Via_phone: Boolean,
  Via_email: Boolean,
  phoneNumber: String,
  Via_app_only: Boolean,
});

const Reminder = mongoose.model(
  "Reminder",
  ReminderSchema
);

module.exports = {
    Reminder
};
