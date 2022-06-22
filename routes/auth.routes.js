const { verifySignUp,authJwt,upload } = require("../middlewares");
const controllerAuth = require("../controller/auth.controller");
const controllerRestaurant = require("../controller/restaurant.controller");
const controllerMenu = require("../controller/menu.controller");
module.exports = function(app) {

  app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"); 
    next();
  });
  

  app.post("/api/auth/signup",verifySignUp.checkDuplicateUsernameOrEmail,controllerAuth.signup);

  app.post("/api/auth/signin", controllerAuth.signin);

  app.post("/api/addRestaurant",controllerRestaurant.addRestaurant);

  app.get("/api/getRestaurants",controllerRestaurant.getRestaurants);

  app.delete("/api/deleteRestaurant/:id",controllerRestaurant.deleteRestaurants);

  app.put("/api/updateRestaurant/:id",controllerRestaurant.updateRestaurants);
  
  app.post("/api/addMenu",controllerMenu.addMenu);

  app.get("/api/getMenus",controllerMenu.getMenu);

  app.delete("/api/deleteMenu/:id",controllerMenu.deleteMenu);

  app.put("/api/putMenu/:id",controllerMenu.updateMenu);

};

