const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapDataSchema =new Schema({

    centerLocationName: {
        type: String,
        // required: true
    },
    cityLocationName:{
        type: String,
        // required:true
    },
    currentLocationAddress:{
        type:String,
        // required:true
    },
    LocationZip:{
        type:String,
        // required:true
    },
    latitude: {
        type: String,
        // required: true
    },
    longitude: {
        type: String,
        // required: true
    },
    
});


const MapData= mongoose.model("MapData",MapDataSchema);

module.exports = {
    MapData,
};
