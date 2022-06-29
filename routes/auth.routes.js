const { verifySignUp,authJwt,upload } = require("../middlewares");
const controllerAuth = require("../controller/auth.controller");
const controllerRestaurant = require("../controller/restaurant.controller");
const controllerMenu = require("../controller/menu.controller");
const { auth } = require("google-auth-library");
module.exports = function(app) {

  app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"); 
    next();
  });
  

  app.post("/api/auth/signup",verifySignUp.checkDuplicateUsernameOrEmail,controllerAuth.signup);

  app.post("/api/auth/signin", controllerAuth.signin);

  app.post("/api/auth/googleSignIn",controllerAuth.googleSignIn);

  // app.post("/api/auth/facebookSignIn",controllerAuth.facebookSignIn);

  app.post("/api/addRestaurant", upload.single("file") ,controllerRestaurant.addRestaurant);

  app.get("/api/getRestaurants",controllerRestaurant.getRestaurants);

  app.delete("/api/deleteRestaurant/:id",controllerRestaurant.deleteRestaurants);

  app.put("/api/updateRestaurant/:id",upload.single("file"),controllerRestaurant.updateRestaurants);

  app.post("/api/addRes_Branch/:brand_id",controllerRestaurant.addRes_Branch);

  app.get("/api/getRes_Branch/:brand_id",controllerRestaurant.getRes_Branch);

  app.delete("/api/deleteRes_Branch/:branch_id/:brand_id",controllerRestaurant.deleteRes_Branch);

  app.post("/api/addMenu/:branch_id",upload.single("file"),controllerMenu.addMenu);

  app.get("/api/getMenus/:branch_id",controllerMenu.getMenu);

  app.delete("/api/deleteMenu/:branch_id",controllerMenu.deleteMenu);

  app.put("/api/putMenu/:branch_id",controllerMenu.updateMenu);

};

