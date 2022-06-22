const { verifySignUp,authJwt,upload } = require("../middlewares");
const controller = require("../controller/auth.controller");

module.exports = function(app) {

  app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"); 
    next();
  });
  

  app.post("/api/auth/signup",[ verifySignUp.checkDuplicateUsernameOrEmail],controller.signup);

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/Send_Password_Link", controller.Send_Password_Link);

  app.post("/api/auth/OTP_Verification", controller.OTP_Verification);

  app.post("/api/auth/Reset_Password_API", controller.Reset_Password_API);

  app.get("/api/v1/sign-out",authJwt.verifyToken, controller.logOut); 

  //app.post("api/v1/account-validation", controller.accountValidation);
  
   app.post("/api/v1/update_contact_no",authJwt.verifyToken, controller.update_contact_no);

   app.post("/api/v1/update_party_support",authJwt.verifyToken, controller.update_party_support);

   app.post("/api/v1/add_candidate",[authJwt.verifyToken, upload.single("file")], controller.add_candidate);

   app.get("/api/v1/get_AllCandidate",authJwt.verifyToken, controller.get_AllCandidate);

   app.put("/api/v1/update_candidate/:id",authJwt.verifyToken, controller.update_candidate);

   app.delete("/api/v1/delete_candidate/:id",authJwt.verifyToken, controller.delete_candidate);

   app.get("/api/v1/get_democrate",authJwt.verifyToken, controller.get_democrate);

   app.get("/api/v1/get_republicans",authJwt.verifyToken, controller.get_republicans);

   app.get("/api/v1/faviourt_candidate/:id",authJwt.verifyToken, controller.faviourt_candidate);

   app.get("/api/v1/faviourt_list",authJwt.verifyToken, controller.faviourt_list);

   app.get("/api/v1/browse_candidates",authJwt.verifyToken, controller.browse_candidates);

   app.post("/api/v1/search_candidate",authJwt.verifyToken, controller.search_candidate);

   app.post("/api/v1/contact_us",authJwt.verifyToken, controller.contact_us);

   app.post("/api/v1/settings",authJwt.verifyToken, controller.settings);

   app.get("/api/v1/Get_Settings",authJwt.verifyToken, controller.Get_Settings);

   app.post("/api/v1/reminder_settings",authJwt.verifyToken, controller.reminder_settings);

   app.get("/api/v1/Get_reminder_settings",authJwt.verifyToken, controller.Get_reminder_settings);

   app.post("/api/v1/reminder_email",authJwt.verifyToken, controller.reminder_email);

   app.post("/api/v1/adding_faq",authJwt.verifyToken, controller.adding_faq);

   app.get("/api/v1/search_faq",authJwt.verifyToken, controller.search_faq);

   app.post("/api/v1/map_location_data", controller.map_location_data);

   app.post("/api/v1/voting_centers", controller.voting_centers);

   app.get("/api/v1/get_voting_center/:latitude&:longitude", controller.get_voting_center);

   app.delete("/api/v1/delete_voting_center/:id", controller.delete_voting_center);

   app.put("/api/v1/update_voting_center/:id", controller.update_voting_center);

};

