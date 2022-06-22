const mongoose = require("mongoose");


const CandidateSchema=new mongoose.Schema({
  Candidate_name: String,
  Candidate_position: String,
  Candidate_state: String,
  Candidate_country: String,
  Candidate_county:String,
  Candidate_party:String,
  Candidate_desc:String,
  Candidate_Image:String,
  Party_logo:String,
  Candidate_CellNo:Number,
  Candidate_website:String,
})


const Candidate = mongoose.model(
  "Candidate",
  CandidateSchema
);

module.exports = {
    Candidate
};
