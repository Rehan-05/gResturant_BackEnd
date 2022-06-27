const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Validator = require("validator");


const votingCenterSchema =new Schema({
      votingCenterName:{
        type:String,
       
        trim:true,
        minlength:3,
        maxlength:20
      },
     votingCenterAddress:{
        type:String,
     
      
        minlength:3,
        maxlength:30
        },
    votingCenterNumber:{
        type:String,
      
        minlength:1,
        maxlength:20
        },
   longitude:{
        type:String,
       
        minlength:3,
        maxlength:20
        },
   latitude:{  
        type:String,
  
        minlength:3,
        maxlength:20
        },

});


const votingCenter= mongoose.model("votingCenter",votingCenterSchema);

module.exports = {
    votingCenter,
};
