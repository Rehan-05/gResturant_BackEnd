const db = require("../model");
const {User} = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
     
    next();
   
  });
};



const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;

