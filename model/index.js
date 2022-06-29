const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.restaurant_Brand= require("./restaurant_brand.model");
db.restaurant_Branch= require("./restaurant_branch.model");
db.menu =  require("./menu.model");
module.exports = db;
