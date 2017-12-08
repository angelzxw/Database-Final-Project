const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const {user,pass} = require("../emailconfig");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
});


router.get('/', contact);
router.post('/sendcontactrequest', sendContactRequest)

function contact(req, res) {
    var context = {
         title: 'Contact',
         isContactForm: true,
    }
    res.render('contact', context);
}

function sendContactRequest(req, res) {
    
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    
    var mailOptions = {
      from: user,
      to: 'zheng.qin@yale.edu',
      subject: 'Artisfy Contact Required',
      text: `Contact Required!!\nuser: ${name}\nemail: ${email}\nphone: ${phone}\nmessage: ${message}`,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.redirect("/");
      }
    });

}

module.exports = router;
