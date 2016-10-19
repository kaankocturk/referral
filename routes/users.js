'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var api_key = 'key-40b8728d78375e160853307036bca47e';
var domain = 'groopapp.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.post('/', function(req, res) {
  User.findOne({email: req.body.email}).exec(function(err, user){
    if(user){
      res.send('registered');
    }else{
      var newuser = new User(req.body);
      newuser.save(function(err, saveditem) {
        var data = {
        from: 'Groop App <noreply@groopapp.com>',
        to: saveditem.email,
        subject: 'Hosgeldiniz!',
        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="x-apple-disable-message-reformatting"> <title></title> <style>*{font-family: sans-serif !important;}</style> <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> <style>html, body{margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important;}*{-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}div[style*="margin: 16px 0"]{margin: 0 !important;}table, td{mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;}table{border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important;}table table table{table-layout: auto;}img{-ms-interpolation-mode: bicubic;}.mobile-link--footer{color: white;}.mobile-link--footer a, a[x-apple-data-detectors]{color: inherit !important; text-decoration: underline !important;}</style> <style>.button-td, .button-a{transition: all 100ms ease-in;}.button-td:hover, .button-a:hover{background: #30215C !important; border-color: #555555 !important;}/* Media Queries */ @media screen and (max-width: 600px){.email-container{width: 100% !important; margin: auto !important;}.fluid{max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important;}.stack-column, .stack-column-center{display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important;}.stack-column-center{text-align: center !important;}.center-on-narrow{text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important;}table.center-on-narrow{display: inline-block !important;}}</style></head><body bgcolor="#30215C" width="100%" style="margin: 0;"> <center style="width: 100%; background: #30215C;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="480" style="margin: auto;" class="email-container"> <tr> <td style="padding: 20px 0; text-align: center"> <img src="https://s4.postimg.org/ca93ygzz1/Screen_Shot_2016_10_19_at_10_11_42_AM.png" width="480" height="174" alt="alt_text" border="0" style="background: #dddddd; font-family: sans-serif; font-size: 15px; mso-height-rule: exactly; line-height: 20px; color: #555555;"> </td></tr></table> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="480" style="margin: auto;" class="email-container"> <tr> <td bgcolor="#ffffff"> <img src="https://s15.postimg.org/d9q34544r/landing.jpg" width="480" height="320" alt="alt_text" border="0" align="center" class="fluid" style="width: 100%; max-width: 600px; background: #30215C; font-family: sans-serif; font-size: 15px; mso-height-rule: exactly; line-height: 20px; color: #555555;"> </td></tr><tr> <td bgcolor="#ffffff" style="padding: 40px; text-align: center; font-family: sans-serif; font-size: 15px; mso-height-rule: exactly; line-height: 20px; color: #555555;"> Groop app e-posta listesine kaydolmus bulunmaktasiniz. Ödüllü davetiye programındaki durumunuzu öğrenmek için aşağıdaki butona tıklayın. <br><br><table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto"> <tr> <td style="border-radius: 3px; background: #30215C; text-align: center;" class="button-td"> <a href="https://www.groopapp.com" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a"> &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ffffff;">Durumunu ogren</span>&nbsp;&nbsp;&nbsp;&nbsp; </a> </td></tr></table> </td></tr></table> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto;" class="email-container"> <tr> <td style="padding: 40px 10px;width: 100%;font-size: 12px; font-family: sans-serif; mso-height-rule: exactly; line-height:18px; text-align: center; color: #888888;"><br>Groop <br><span class="mobile-link--footer">Istanbul, Turkiye</span> <br><span class="mobile-link--footer">info@groopapp.com</span> <br><br><span class="mobile-link--footer">Bizden daha fazla e-posta almak istemiyorsanız aşağıdaki linke tıklayın</span> <br><br><br><td/><tr/></table></center>%unsubscribe_url%</body></html>'
      };

      mailgun.messages().send(data, function (error, body) {
        console.log(body);
        console.log(error);
      });
        res.send(saveditem);
      });
    }
    });
  });

  router.post('/referral', function(req, res) {
    User.findOne(req.body).exec(function(err, user) {
      if(user){
        user.count+=1;
        user.save(function(err, saveditem) {
          res.send(saveditem);
        });
      }
      });
    });

  router.get('/emaillist/1', function(req, res, next) {
    User.find({}).exec(function(err, items) {
        res.send(items);
      });
    });

    router.get('/:id', function(req, res, next) {
      User.findOne({email: req.params.id}).exec(function(err, user) {
          res.send(user);
        });
      });


module.exports = router;
