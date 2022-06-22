const db = require("../model");
const { Menu } = require("../model/menu.model");


exports.addMenu = async (req, res) => {
    const menu = new Menu ({
        DishName : req.body.DishName,
        DishPrice : req.body.DishPrice,
        DishDesc : req.body.DishDesc
    });

    await menu.save((err, menu) => {
        if (err) {
        res.status(500).send({ message: err,status:500 });
        return;
        }
    
        res.status(200).send({
        id: menu._id,
        DishName: menu.DishName,
        DishPrice: menu.DishPrice,
        DishDesc: menu.DishDesc,
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