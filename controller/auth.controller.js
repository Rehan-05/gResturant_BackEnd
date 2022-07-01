const config = require("../config/auth.config");
const db = require("../model");
const {User} = db.user;
const {OAuth2Client} =  require("google-auth-library")
// import fetch from 'node-fetch';

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response } = require("express");
const { EXPIRATION_TIME_OFFSET } = require("google-auth-library/build/src/auth/baseexternalclient");
// const crypto = require('crypto')
// var sendResentEmail = require('../middlewares/sendResentEmail');
// var send_NotificationEmail= require('../middlewares/send_NotificationEmail');

const client = new OAuth2Client(config.CLIENT_ID);

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
      
      var token = jwt.sign({ id: user.id }, config.secret,{ expiresIn: '24h'});

      res.status(200).send({
        id: user._id,
        email: user.email,
        accessToken: token,
        status: 200,
      });
    });
};

//google login token save in database
exports.googleSignIn = (req, res) => {
  const {tokenId} = req.body;
  
  client.verifyIdToken({idToken:tokenId, audience: config.CLIENT_ID}).then((ticket) => {
    const {email_verified, name, email} = ticket.payload;
    if(email_verified)
    {
      User.findOne({email}).exec((err,user)=>{
        if(err)
        {
          return res.status(400).json({
            error:"something went wrong..."
          })
        }
        else{
          if(user)
          {
            var token = jwt.sign({ id: user.id }, config.secret);
            const {_id,name,email} = user;
            res.json({
              token,
              user:{_id,name,email}
            })
          }else{
             let password = email+config.secret;
             let newUser = new User({name,email,password});
             newUser.save((err,data)=>{
              if(err){
                return res.status(400).json({
                  error: "Something went wrong"
                })
              }
              var token = jwt.sign({ id: data.id }, config.secret);
              const {_id,name,email} = newUser;
              res.json({
                token,
                user:{_id,name,email}
              })
             })

          }
        }
      })
    }
  }).catch(err => {
      console.log(err)
  })
}


//facebookSignIn Controller

exports.facebookSignIn = (req, res) => {
  const {tokenId, userID} = req.body;
  
  const  urlGraphFaceBook = `https://graph.facebook.com/v2.11/${userID}/fields?=id,name,email&access_token=${tokenId}`;
  fetch(urlGraphFaceBook,{
    method:"GET",
  })
  .then(response => response.json())
  .then(data => {
    const {email, name} = data;
    User.findOne({email}).exec((err,user)=>{
      if(err)
      {
        return res.status(400).json({
          error:"something went wrong..."
        })
      }
      else{
        if(user)
        {
          var token = jwt.sign({ id: user.id }, config.secret);
          const {_id,name,email} = user;
          res.json({
            token,
            user:{_id,name,email}
          })
        }else{
           let password = email+config.secret;
           let newUser = new User({name,email,password});
           newUser.save((err,data)=>{
            if(err){
              return res.status(400).json({
                error: "Something went wrong"
              })
            }
            var token = jwt.sign({ id: data.id }, config.secret);
            const {_id,name,email} = newUser;
            res.json({
              token,
              user:{_id,name,email}
            })
           })

        }
      }
    })
  })
}

