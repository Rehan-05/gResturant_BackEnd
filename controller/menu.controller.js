const db = require("../model");
const { Menu } = require("../model/menu.model");

// controller for adding menu for a specific branch
exports.addMenu = async (req,res) => { 
   
     const imagesArray = req.files.map(file => file.originalname);
     console.log("here is the file that we have to upload in the mongoDB",imagesArray);
     const menu = new Menu({
        Res_BranchID: req.params.branch_id,
        DishName: req.body.DishName,
        DishPrice: req.body.DishPrice,
        DishDesc: req.body.DishDesc,
        DishImage : imagesArray
    });
    await menu.save((err, menu) => {
        if (err) {
        res.status(500).send({ message: err,status:500 });
        return;
        }
    
        res.status(200).send({
        id: menu._id,
        Res_BranchID: menu.Res_BranchID,
        DishName: menu.DishName,
        DishPrice: menu.DishPrice,
        DishDesc: menu.DishDesc,
        DishImage: menu.DishImage,
        status: 200,
        });
        return;
    });
}

    // Get all the menu for a specific branch
    exports.getMenu = async (req,res) => {
        const menu = await Menu.find({Res_BranchID: req.params.branch_id});
        res.status(200).json({
            status: "success",
            message: "All Menu",
            data: menu
            });
    }

   //Delete the dish on a specific id and branch id
    exports.deleteMenu = async (req,res) => {
        const menu = await Menu.findOneAndDelete({_id: req.params.dish_id,Res_BranchID: req.params.branch_id});
        if(!menu){
            res.status(404).json({
                status: "fail",
                message: "Dish in this specific menu not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Dish deleted successfully",
            data: menu
        });
    }

  // Update the menu dish on a specific id and branch id
    exports.updateMenu = async (req,res) => {
        const imagesArray = req.files.map(file => file.originalname);
        const menu = await Menu.findOneAndUpdate({_id: req.params.dish_id,Res_BranchID: req.params.branch_id},{
            DishName: req.body.DishName,
            DishPrice: req.body.DishPrice,
            DishDesc: req.body.DishDesc,
            DishImage: imagesArray
        });
        if(!menu){
            res.status(404).json({
                status: "fail",
                message: "Dish in this specific menu not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Dish updated successfully",
            data: menu
        });
    }