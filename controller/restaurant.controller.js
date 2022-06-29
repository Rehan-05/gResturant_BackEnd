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
        const image = req.file.originalname;
        const restaurant = await Restaurant_Brand.findByIdAndUpdate(req.params.id,{
            Res_BrandName: req.body.Res_BrandName,
            Res_BrandLogo: image,   
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


    //Add restaurant branch controller with the reference of restaurant id

    exports.addRes_Branch = async (req,res) => {
        
        const restaurant = await Restaurant_Brand.findById(req.params.brand_id);

        console.log("here is he restaurant brand id", restaurant );

        if(restaurant){

         const restaurant_branch = new Restaurant_Branch({
            Res_BrandID: restaurant._id,
            Res_BranchName: req.body.Res_BranchName,
            Res_BranchAddress: req.body.Res_BranchAddress,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });

        await restaurant_branch.save((err, branch) => {
            if (err) {
                console.log("errrrrrroorr",err);
                res.status(500).send({ message: err,status:500 });
                return;
            }
            res.status(200).send({
            Res_BrandID:branch.Res_BrandID,
            Res_BranchName: branch.Res_BranchName,
            Res_BranchAddress: branch.Res_BranchAddress,
            startTime:branch.startTime,
            endTime: branch.endTime,
            status: 200,
            });
            return;
        });
    }
    else{
        res.status(404).json({
            status: "fail",
            message: "Restaurant not found. Please Enter Details of Restaurant First",
        });

    }
  }


  // get all the branches in the specific restaurant

  exports.getRes_Branch = async(req,res) => {
    const restaurant = await Restaurant_Brand.findById(req.params.brand_id);
    if(!restaurant){
        res.status(404).json({
            status: "fail",
            message: "No Branch is Available for this restaurant"
        });
    }
    const restaurant_branch = await Restaurant_Branch.find({Res_BrandID: restaurant._id});
    res.status(200).json({
        status: "success",
        message: "All Branches",
        data: restaurant_branch
    }); 
  }

  // Delete the branch on a specific id

  exports.deleteRes_Branch = async (req,res) => {
   
    const restaurant_branch = await Restaurant_Branch.findById(req.params.branch_id);
    if(!restaurant_branch){
        res.status(404).json({
            status: "fail",
            message: "Restaurant Brand not found"
        });
    }
    const restaurant = await Restaurant_Brand.findByIdAndDelete(req.params.brand_id);
    if(!restaurant){
        res.status(404).json({
            status: "fail",
            message: "No Branch found for this Restaurant"
        });
    }
    res.status(200).json({
        status: "success",
        message: "Branch deleted successfully",
        data: restaurant_branch
    });
  }

