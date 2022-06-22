const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.Candidate= require("./candidate.model");
db.faviourt_candidate= require("./faviourt_candiate.model");
db.Contact= require("./contactUs.model");
db.Settings = require("./settings.model");
db.Reminder = require("./reminder.model");
db.Faq = require("./faq.model");
db.PasswordReset = require("./PasswordReset.model");
db.MapData = require("./map_Data.model");
db.VotingCenter = require("./Voting_centers.model");


module.exports = db;
