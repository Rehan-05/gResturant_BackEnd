const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PasswordResetSchema =new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
      type: String,
      // required: true,
  },
  randomNumber:{
    type:Number,
  },
createdAt: {  
      type: Date,
      default: Date.now,
  },
  expireAt:{
    type:Date,
    default:Date.now,
    expires: 60,
  }
})


const PasswordReset= mongoose.model("PasswordReset",PasswordResetSchema);

module.exports = {
    PasswordReset,
};
