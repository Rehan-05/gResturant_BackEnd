const mongoose = require("mongoose");

const FaqSchema=new mongoose.Schema({
    question: String,
    answer: String,   
})

const Faq = mongoose.model(
  "Faq",
  FaqSchema
);

module.exports = {
    Faq
};
