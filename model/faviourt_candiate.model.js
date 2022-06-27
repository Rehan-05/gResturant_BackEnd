const mongoose = require("mongoose");


const faviourtSchema=new mongoose.Schema({
 userId: String,
 candidateId: String,
})

const faviourt = mongoose.model(
  "faviourt",
  faviourtSchema
);

module.exports = {
    faviourt
};
