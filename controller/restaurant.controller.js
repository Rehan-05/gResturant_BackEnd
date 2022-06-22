const db = require("../model");
const {Restaurant} = db.restaurant;

// add restaurant controller
exports.addRestaurant = async (req, res) =>  {
    const restaurant = new Restaurant({
        ResName: req.body.ResName,
        ResAddress: req.body.ResAddress,
        ResPhoneNo: req.body.ResPhoneNo,
    });
    
    await restaurant.save((err, restaurant) => {
        if (err) {
        res.status(500).send({ message: err,status:500 });
        return;
        }
    
        res.status(200).send({
        id: restaurant._id,
        Resname: restaurant.Resname,
        ResAddress: restaurant.ResAddress,
        ResPhoneNo: restaurant.ResPhoneNo,
        status: 200,
        });
        return;
    });
}

//get all the restaurants

exports.getRestaurants = async (req,res) => {
    const restaurant = await Restaurant.find();
    res.status(200).json({
        status: "success",
        message: "All Restaurants",
        data: restaurant
      });

}


//Delete the restaurant on a specific id

exports.deleteRestaurants = async (req,res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if(!restaurant){
        res.status(404).json({
            status: "fail",
            message: "Restaurant not found"
        });
    }
    res.status(200).json({
        status: "success",
        message: "Restaurant deleted successfully",
        data: restaurant
    });
}

 //Update the restaurant on a specific id

    exports.updateRestaurants = async (req,res) => {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id,{
            ResName: req.body.ResName,
            ResAddress: req.body.ResAddress,
            ResPhoneNo: req.body.ResPhoneNo,
        });
        if(!restaurant){
            res.status(404).json({
                status: "fail",
                message: "Restaurant not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Restaurant updated successfully",
            data: restaurant
        });
    }