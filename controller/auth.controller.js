const config = require("../config/auth.config");
const db = require("../model");
const {User} = db.user;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// const crypto = require('crypto')
// var sendResentEmail = require('../middlewares/sendResentEmail');
// var send_NotificationEmail= require('../middlewares/send_NotificationEmail');



exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err,status:500 });
      return;
    }
    
    var token = jwt.sign({ id: user.id }, config.secret);

  
    res.status(200).send({
      id: user._id,
      email: user.email,
      accessToken: token,
      status: 200,
    });
    return;
  });
};


exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err ,status: 500});
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
        
      );
        // console.log(passwordIsValid," >>>>>>>>",req.body.password)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          status: 401,
          message: "Invalid Password!",
          user
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret);

  
      res.status(200).send({
        id: user._id,
        email: user.email,
        accessToken: token,
        status: 200,
      });
    });
};
