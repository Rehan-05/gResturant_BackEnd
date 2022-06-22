const config = require("../config/auth.config");
const db = require("../model");
const {User} = db.user;
const {Candidate} = db.Candidate;
const {faviourt} = db.faviourt_candidate;
const {Contact} = db.Contact;
const {Settings} = db.Settings;
const {Reminder }  = db.Reminder;
const {Faq} = db.Faq;
const {PasswordReset} = db.PasswordReset;
const {MapData} =  db.MapData;
const {votingCenter} = db.VotingCenter;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require('crypto')
var sendResentEmail = require('../middlewares/sendResentEmail');
var send_NotificationEmail= require('../middlewares/send_NotificationEmail');



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





// forgot password controller

  exports.Send_Password_Link = async (req, res) => {
     try {
       const {email } = req.body;
       const otp = Math.floor(100000 + Math.random() * 900000);
       const ttl = 1*60;
       const expires = Date.now() + ttl;

       const user = await User.findOne({email: email});

        if (!user)
            return res.status(400).send("user with given email doesn't exist");
       
          
        let token = await PasswordReset.findOne({ userId: user._id });
         
        if (!token) {
            token = await new PasswordReset({
                userId: user._id,
                // token: crypto.randomBytes(32).toString("hex"),
                randomNumber: otp,
                createdAt: new Date(),
                expireAt: expires
            }).save();
        }
    

        if (token.createdAt > token.expireAt) {
            token.randomNumber = otp;
            token.createdAt = new Date();
            token.expireAt = expires;
            await token.save();
            res.status(200).json({
              status: 200,
              message: "Updated OTP has been sent on your Gmail",
            });
            
        }

        // /api/auth/Reset_Password_API
        // const link = `${config.BASE_URL}/password-reset/${user._id}/${token.token}`;
        // const randomEightDigits = crypto.randomBytes(6).toString('base64');

        // let RadomSixDigits ;
        // RadomSixDigits= crypto.randomInt(0, 1000000);
        // console.log("rehan this is random number generation",RadomSixDigits);
        
        const randomNumber = `${token.randomNumber}`;
        console.log("rehan this is random number generation",randomNumber);

        const EmailBody = "Hi, Please copy the given verification code for reset your password. Code is: "+randomNumber+" Thank you. It will expire within 60 seconds";
        await sendResentEmail(user.email, "Password Verfication Code", EmailBody);

        res.send("password reset verification code sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
  };






  //OTP varification controller

  exports.OTP_Verification = async (req, res) => {
    try {
      const {email, otp} = req.body;
      const user = await User.findOne({email: email});
      if (!user) return res.status(400).send("invalid user or expired");
      const OTP_Verify = await PasswordReset.findOne({ userId: user._id });
      if (!OTP_Verify) return res.status(400).send("User has not been sent any OTP yet");
      if (OTP_Verify.randomNumber != otp) return res.status(400).send("OTP in not Valid.");
      if (OTP_Verify.createdAt > OTP_Verify.expireAt) return res.status(400).send("OTP has been expired.");

      //When the OTP is verify then user will send the JWT token to the client and save the token in the PasswordReset collection
      const accessToken = jwt.sign({ id: user._id }, config.secret);
      OTP_Verify.token = accessToken;
      await OTP_Verify.save();
      res.status(200).json({
        status: 200,
        message: "OTP has been verified",
        accessToken: accessToken,
      });
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  };







  //Reset password controller

  exports.Reset_Password_API = async (req, res) => {
   //Get tthe token from PasswordReset Collection and verify the token then update user password on the base of the token
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email: email});

      if (!user) return res.status(400).send("user email not found.");

      const OTP_Verify = await PasswordReset.findOne({ userId: user._id });
    
      if (!OTP_Verify.token) return res.status(200).send("Token not Found ");
      
      user.password = bcrypt.hashSync(password, 8);
      await user.save();
      await PasswordReset.deleteOne({ userId: user._id });

      res.status(200).json({
        status: 200,
        message: "Password has been updated",
      });
      
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }

  }





  //sign-Out controller 
  exports.logOut = async (req, res) => {

    req.token = [];
    res.status(200).json({
      status: 200,
      message: "User has been logged out"
    });
    
  }
  





  // User contact no api

  exports.update_contact_no = async (req, res) => {
  
    // const req_user= await User.find({ id: req.user._id,});
    console.log(req.userId); 
    const updatedUser_contact = await User.findByIdAndUpdate(req.userId, {
      contact_number: req.body.contact_number,
    });

    await updatedUser_contact.save(updatedUser_contact);
    res.status(200).json({
      status: "success",
      message: "User contact number updated successfully",
      data: updatedUser_contact
    });

  }




  // User party name api

  exports.update_party_support = async (req, res) => {
    const updatedUser_party = await User.findByIdAndUpdate(req.userId, {
      party_support: req.body.party_support,
    });
    await updatedUser_party.save(updatedUser_party);
    res.status(200).json({
      status: "success",
      message: "User party name updated successfully",
      data: updatedUser_party
    });
  } 





// add candiate controller
   
 exports.add_candidate = async (req,res) => {
   
  // const imgUrl = `http://localhost:8080/file/${req.file.filename}`;

  const {Candidate_name, Candidate_party, Candidate_desc,Candidate_position, Candidate_Image, Party_logo , Candidate_CellNo, } = req.body;

  const candidates = new Candidate({
     Candidate_name: Candidate_name,
     Candidate_party: Candidate_party,
     Candidate_position:Candidate_position,
     Candidate_desc:Candidate_desc,
     Candidate_Image: Candidate_Image,
     Party_logo :Party_logo,
     Candidate_CellNo : Candidate_CellNo,
  });

  await candidates.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err,status:500 });
      return;
    }
    // res.status(200).send("Candidate Add Successfully");
    res.status(200).json({
      status: "success",
      message: "Candidate Add Successfully",
      data: user
    });
  });
}


//GET ALL THE CANDIDATES

  exports.get_AllCandidate = async(req,res) => {
    const candidate = await Candidate.find();
    res.status(200).json({
      status: "success",
      message: "All Candidates",
      data: candidate
    });
  }


// Update the candidate details controller

exports.update_candidate = async (req,res) => {
  const {Candidate_name, Candidate_party, Candidate_desc,Candidate_position, Candidate_Image, Party_logo , Candidate_CellNo, } = req.body;
  const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, {
    Candidate_name: Candidate_name,
    Candidate_party: Candidate_party,
    Candidate_position:Candidate_position,
    Candidate_desc:Candidate_desc,
    Candidate_Image: Candidate_Image,
    Party_logo :Party_logo,
    Candidate_CellNo : Candidate_CellNo,
  });
  await updatedCandidate.save((err, updatedCandidate) => {
    if (err) {
      res.status(500).send({ message: err,status:500 });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "Candidate Add Successfully",
      data: updatedCandidate
    });
  });
}


// Delete the candidate details controller

exports.delete_candidate = async (req,res) => {
  const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
  await deletedCandidate.save((err, deletedCandidate) => {
    if (err) {
      res.status(500).send({ message: err,status:500 });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "Candidate Deleted Successfully",
      data: deletedCandidate
    });
  });
}



// get democrate candidate controller

  exports.get_republicans = async (req,res) => {
    const candidates = await Candidate.find({Candidate_party:"Democrat"});
    res.status(200).json({
      status: "success",
      message: "Candidate List of Democratics",
      data: candidates
    });
    
  }





 
  // get Republican candidate controller

  exports.get_democrate = async (req,res) => {
    const candidates = await Candidate.find({Candidate_party:"Republican"});
    res.status(200).json({
      status: "success",
      message: "Candidate List of Republican",
      data: candidates
    });
    
  }





  // all faviourt_candidate

  exports.faviourt_candidate = async (req,res) => {
     
    const candidateId  = req.params.id;
    const userId = req.userId;
    const favioute =  new faviourt({
      candidateId,
      userId
    });
    await favioute.save(favioute);
    res.status(200).json({
      status: "success",
      message: "faviourt_candidates List",
      data: favioute
    });
    
  }




  // get faviourt List controller

    exports.faviourt_list = async (req,res) => {
      let candidate_arr=[]
      const userId = req.userId;
      const favioutes = await faviourt.find({userId});
      favioutes.map(favioutes => {
        candidate_arr.push(favioutes.candidateId)
      })
      const candidates = await Candidate.find({candidateId : {$in: candidate_arr}});
      res.status(200).json({
        status: "success",
        message: "faviourt_candidates List",
        data: candidates
      });
      
    }




    // Browse All the candidates

    exports.browse_candidates = async (req,res) => {
      const candidates = await Candidate.find();
      res.status(200).json({
        status: "success",
        message: "Candidate List of Republican",
        data: candidates
      });
      
    }



    // Search Candidate controller

    exports.search_candidate = async (req,res) => {
      
      const {Candidate_position,Candidate_state,Candidate_county} = req.body;
      const candidates = await Candidate.find({Candidate_position:Candidate_position,Candidate_state:Candidate_state,Candidate_county:Candidate_county })
      res.status(200).json({
        status: "success",
        message: "Search Candidate successfully",
        data: candidates
      });
      
    }
 



    // Contact form Controller

    exports.contact_us = async (req,res) => {
      const {Person_type, Name, Email, Des} = req.body;
      const contact = new Contact({
        Person_type:Person_type,
        Name:Name,
        Email:Email,
        Des:Des
      });
      await contact.save(contact);
      res.status(200).json({
        status: "success",
        message: "Contact form successfully",
        data: contact
      });
    }




      // Setting Controller

      exports.settings = async (req,res) => {
    
        const user = await User.findOne(req.userId);
        console.log(">>>>>>>>>>>>>>>>>>>>>",user);
        const { Notifications,Location} = req.body;
        const settings = new Settings({
          Notifications:Notifications,
         Location: Location 
        });
        //Delete the specific record against a specific id
        await Settings.deleteOne(user._id);
        await settings.save(settings);
        res.status(200).json({
          status: "success",
          message: "Setting successfully",
          data: settings
        });
      }





      // get Setting Controller

      exports.Get_Settings = async (req,res) => {
         const userId = req.body;
        const settings = await Settings.find({userId});
        res.status(200).json({
          status: "success",
          message: "Setting Data get successfully",
          data: settings
        });
      }





      //post reminder screen 
      
      exports.reminder_settings = async (req,res) => {
      
        const {Primary_election,General_election,Via_phone,Via_email,Via_app_only,phoneNumber} = req.body;
        console.log(">>>>>>>>>>>>>>>>>>>>>",req.userId);
        User.findOne(req.UserId,(err,user)=>{

          if(err){
            res.status(500).send({ message: err,status:500 });
            return;
          }
          if(!user){
            res.status(404).send({ message: "User not found",status:404 });
            return;
          }

          const settings = new Reminder({
            Primary_election : Primary_election,
            General_election: General_election,
            Via_phone: Via_phone,
            Via_email: Via_email,
            Via_app_only: Via_app_only,
            phoneNumber: phoneNumber,
            user_id: user._id
          });

          Reminder.findOne({user_id:user._id})
           .exec((err,data) => {
              if(err){
                // console.log(">>>>>>>>>>>>>>>>>>>>>Eroroor",err);
                res.status(500).send({ message: err,status:500 });
                return;
              }
              

              if(data){
                Reminder.updateOne({user_id:user._id},{$set: {
                  Primary_election : Primary_election,
                  General_election: General_election, 
                  Via_phone: Via_phone,
                  Via_email: Via_email,
                  Via_app_only: Via_app_only,
                  phoneNumber: phoneNumber
                }},(err,data) => {
                  if(err){
                    res.status(500).send({ message: err,status:500 });
                    return;
                  }
                  console.log(data)
                  res.status(200).json({
                    status: "success",
                    message: "Reminder settings update successfully",
                    data: data
                  });
                  return

                }
                )
              }else{
                console.log("-===========================================================")
                settings.save((err,data)=>{
                  if(err){
                    res.status(500).send({ message: err,status:500 });
                    return;
                  }
                  res.status(200).json({
                    status: "success",
                    message: "Reminder settings successfully",
                    data: data
                  });
                  return
                });
                
              }
            }
          )
        })
      }



      // get reminder screen

      exports.Get_reminder_settings = async (req,res) => {
        const userId = User.findOne(req.userId);
        console.log(userId);
        const settings = await Reminder.find(userId);
        res.status(200).json({
          status: "success",
          message: "Setting Data get successfully",
          data: settings
        });
      }
 



      // Adding Faq's questions

      exports.adding_faq = async (req,res) => {
        const {question,answer} = req.body;
        const faq = new Faq({
          question:question,
          answer:answer
        });
        await faq.save(faq);
        res.status(200).json({
          status: "success",
          message: "Faq questions added successfully",
          data: faq
        });
      }




    
       // Search FAQ's from DB

       exports.search_faq = async (req,res) => {
        // const keyword = req.params.words;
        // if (!keyword) {
        //   return res.status(400).send({ error: true, message: 'Nothing Found' });
        //  }
        const faq = await Faq.find();
        console.log(faq)
        res.status(200).json({
          status: "success",
          message: "Faq questions added successfully",
          data: faq
        });
        return
      }





      // When email is turn On Send notification to user on gmail account

      exports.reminder_email = async (req,res) => {
        try {
          const {email } = req.body;
          const user = await User.findOne({email: email});
          if (!user)
              return res.status(400).send("user with given email doesn't exist");
          await send_NotificationEmail(user.email, "Hey! Elections are starting in New York");

          res.send("Notification alert send to user on email");
        
      } catch (error) {
          res.send("An error occured");
          console.log(error);
      }
  
      }




      //map location Data  model

      exports.map_location_data = async (req,res) => {
        const { centerLocationName,cityLocationName,currentLocationAddress,LocationZip,latitude,longitude } = req.body;
        const map_location = new MapData({
          centerLocationName:centerLocationName,
          cityLocationName:cityLocationName,
          currentLocationAddress:currentLocationAddress,
          LocationZip:LocationZip,
          latitude:latitude,
          longitude:longitude
        });
        await map_location.save(map_location);
        res.status(200).json({
          status: "success",
          message: "Map location added successfully",
          data: map_location
        });
      }


      // Adding voting centers Details

      exports.voting_centers = async (req,res) => {
        const {votingCenterName,votingCenterAddress,votingCenterNumber,longitude,latitude} = req.body;

        const voting_center = new votingCenter({
          votingCenterName:votingCenterName,
          votingCenterAddress:votingCenterAddress,
          votingCenterNumber:votingCenterNumber,
          longitude:longitude,
          latitude:latitude
        });
        await voting_center.save(voting_center);
        res.status(200).json({
          status: "success",
          message: "Voting center added successfully",
          data: voting_center
        });
      }



     
      // Get voting center's controller 

      exports.get_voting_center = async (req,res) => {
        
        const latitude = req.params.latitude;
        const longitude = req.params.longitude;
        //s
        const voting_center = await votingCenter.find({votingCenterLatitude:latitude,votingCenterLogitude:longitude});
        if(!voting_center){
          res.status(404).send({ message: "Voting center not found",status:404 });
          return;
        }
        res.status(200).json({
          status: "success",
          message: "Voting center added successfully",
          data: voting_center
        });
      }


      //Delete the voting center

      exports.delete_voting_center = async (req,res) => {
        const votingCenterId = req.params.votingCenterId;
        const voting_center = await votingCenter.findByIdAndDelete(votingCenterId);
        if(!voting_center){
          res.status(404).send({ message: "Voting center not found",status:404 });
          return;
        }
        res.status(200).json({
          status: "success",
          message: "Voting center deleted successfully",
          data: voting_center
        });
      }
       

      //update the voting center

      exports.update_voting_center = async (req,res) => {
        const votingCenterId = req.params.votingCenterId;
        const {votingCenterName,votingCenterAddress,votingCenterNumber,longitude,latitude} = req.body;
        const voting_center = await votingCenter.findByIdAndUpdate(votingCenterId,{
          votingCenterName:votingCenterName,
          votingCenterAddress:votingCenterAddress,
          votingCenterNumber:votingCenterNumber,
          longitude:longitude,
          latitude:latitude
        });
        if(!voting_center){
          res.status(404).send({ message: "Voting center not found",status:404 });
          return;
        }
        res.status(200).json({
          status: "success",
          message: "Voting center updated successfully",
          data: voting_center
        });
      } 
