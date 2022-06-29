const db = require("../model");
const {Restaurant_Brand} = db.restaurant_Brand;
const {Restaurant_Branch} = db.restaurant_Branch;

// add restaurant controller

exports.addRestaurant = async (req,res) => {
    const image = req.file.originalname;
    console.log("sffasffdfsdfsddsfsdfsdf",req.file);

    const restaurant_brand = new Restaurant_Brand({
        Res_BrandName: req.body.Res_BrandName,
        Res_BrandLogo: image,
    });
    
    await restaurant_brand.save((err, restaurant_brand) => {
        if (err) {
        res.status(500).send({ message: err,status:500 });
        return;
        }
    
        res.status(200).send({
        id: restaurant_brand._id,
        Res_BrandName: restaurant_brand.Res_BrandName,
        Res_BrandLogo: restaurant_brand.Res_BrandLogo,
        status: 200,
        });
        return;
    }

    );


}

// exports.addRestaurant = async (req, res) =>  {
//     const restaurant = new Restaurant_Brand({
//         ResName: req.body.ResName,
//         ResAddress: req.body.ResAddress,
//         ResPhoneNo: req.body.ResPhoneNo,
//     });
    
//     await restaurant.save((err, restaurant) => {
//         if (err) {
//         res.status(500).send({ message: err,status:500 });
//         return;
//         }
    
//         res.status(200).send({
//         id: restaurant._id,
//         Resname: restaurant.Resname,
//         ResAddress: restaurant.ResAddress,
//         ResPhoneNo: restaurant.ResPhoneNo,
//         status: 200,
//         });
//         return;
//     });
// }

//get all the restaurants

exports.getRestaurants = async (req,res) => {
    const restaurant = await Restaurant_Brand.find();
    res.status(200).json({
        status: "success",
        message: "All Restaurants",
        data: restaurant
      });

}


//Delete the restaurant on a specific id

exports.deleteRestaurants = async (req,res) => {
    const restaurant = await Restaurant_Brand.findByIdAndDelete(req.params.id);
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
        const restaurant = await Restaurant_Brand.findByIdAndUpdate(req.params.id,{
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