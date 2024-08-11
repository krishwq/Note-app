const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");

//1.to send otp using post /api/sendmail/otp
router.post("/otp", async (req, res) => {
  let success=false;
  const { userEmail,username,otp } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: "birkrishnendu@gmail.com",
      pass: "hakjsustwnhrqiio",
    },
  };
  const transporter = nodemailer.createTransport(config);
  let mailgenarator = new mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: username,
      intro:"This is iNotebook app.Your note is secure in cloud.",
      action: {
        instructions: 'Verify your Email account by this OTP',
        button: {
            color: '#22BC66', 
            text: otp,
        }
    },
    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      
    },
  };
  let mail = mailgenarator.generate(response);
  let message = {
    from: "birkrishnendu@gmail.com",
    to: userEmail,
    subject: "Verify your email in iNotebook",
    html: mail,
  };
  transporter.sendMail(message).then(()=>{
    success=true;
    return res.status(201).json({success,msg:"you should receive a email"})
  }).catch((error)=>{
    return res.status(500).json({error})
  });
});
module.exports=router;