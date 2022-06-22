
const nodemailer = require("nodemailer");

// send password reset email
const sendResentEmail = async (email, subject,text) => {
     
  try {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        type: "SMTP",
        host: "smtp.gmail.com",
        // port: 587,
        secure: false,
        auth: {
          user: 'laibaabbasi857@gmail.com', // generated ethereal user
          pass: 'RehanGoraya123!?', // generated ethereal password
        },
        // tls:{
        //   rejectUnauthorized:false
        // }
    });

    await transporter.sendMail({
        from: 'laibaabbasi857@gmail.com', // sender address
        to: email,// list of receivers
        subject: subject,
        text: text,
    });

    console.log("email sent successfully");
    } catch (error) {
       console.log(error, "email not sent");
    }
  };


  module.exports = sendResentEmail;
