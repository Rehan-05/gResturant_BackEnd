const db = require("../model");
const { Menu } = require("../model/menu.model");

// controller for adding menu for a specific branch
exports.addMenu = async (req,res) => { 
     const images = req.file.originalname;
    const menu = new Menu({
        Res_BranchID: req.params.branch_id,
        DishName: req.body.DishName,
        DishPrice: req.body.DishPrice,
        DishDesc: req.body.DishDesc,
        DishImage : images
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

exports.getMenu = async (req,res) => {
    const menu = await Menu.find();
    res.status(200).json({
        status: "success",
        message: "All Menu",
        data: menu
      });
}

exports.deleteMenu = async (req,res) =>{
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if(!menu){
        res.status(404).json({
            status: "fail",
            message: "Menu not found"
        });
    }
    res.status(200).json({
        status: "success",
        message: "Menu deleted successfully",
        data: menu
    });
}

exports.updateMenu = async (req,res) => {
    const menu = await Menu.findByIdAndUpdate(req.params.id, {
        DishName: req.body.DishName,
        DishPrice: req.body.DishPrice,
        DishDesc: req.body.DishDesc
    });
    if(!menu){
        res.status(404).json({
            status: "fail",
            message: "Menu not found"
        });
    }
    res.status(200).json({
        status: "success",
        message: "Menu updated successfully",
        data: menu
    });
}