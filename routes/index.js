const express = require('express');
const router = express.Router();
const dns = require('dns');
const _ = require('lodash');
const userModel = require('../models/table/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("success");
  //If user session is valid, redirect to dashboard
  res.locals.user ? res.redirect('/dashboard') : res.render('index', { title: 'Login' });
})
.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
})
//Check user's email provider
.post('/signup/email', (req, res, next) => {
  let {email} = _.pick(req.body, ['email']);

  let domain = email.split('@')[1];
  dns.resolveMx(domain, (err, address) => {
    if (err) res.status(422).send(err);
    address[0].exchange.includes('google') ? res.send(JSON.stringify({'auth':'google', 'address': email})) 
                                            : res.send(JSON.stringify({'auth':'email', 'address': email}));
})
}) 
.post('/signup', (req, res, next) => {
  let {firstName, lastName, email, password} = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
  if (!firstName || !password) {
    res.status(422).send("Please fill out all required fields");
  } else {
  //Check if email address is currently in use
    //Encrypt user password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
          userModel.create({
          firstName,
          lastName,
          email,
          password: hash,
          picture: '../images/placeholder.png'
        })
        .then((user) => {
          const userEmail = user.email;
          let transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user: 'digitalcraftsatl@gmail.com', // generated ethereal user
                pass: '8333272387'  // generated ethereal password
            },
            tls:{
                rejectUnauthorized:false
            }
        })
        let mailOptions = {
            from: '"DigitalTasks 👻" <digitalcraftsatl@gmail.com>', // sender address
            to: userEmail, // list of receivers
            subject: 'Welcome to Digital Tasks!', // Subject line
            text: 'Hello world?', // plain text body
            html: '<h2>Welcome to DigitalTasks, Please enjoy this kitten</h2>   <img src="cid:unique@nodemailer.com"/>', // html body
            attachments: [
                // Binary Buffer attachment
                {
                    filename: 'gif.gif',
                    path: './public/gif.gif',
                    cid:'unique@nodemailer.com'
                }]
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });




          res.status(201).send({"userCreated":"True"});
        })
        .catch(err => {
          console.log(err)
          if (err.name ==='SequelizeUniqueConstraintError'|| err.name ==='SequelizeValidationError'){
            res.status(422).send(err.message)
          }
          else{
          console.log(err);
          }
        })
    })
  })
}
})

.post('/login', function(req, res) {
  let {email, password} = _.pick(req.body, ['email', 'password']);
  let domain = email.split('@')[1];
  userModel.findOne({
    where: {email}
  })
  .then((user) => {     
  //If no user exists, throw error
  if (!user) {
    res.status(400).send();
  } else {
  let firstName = user.dataValues.firstName;
  !user.dataValues.password ? res.send({'auth': 'google', 'username': `${firstName}`}) : res.send({'auth': 'email', 'username': `${firstName}`});
}
  })
});

module.exports = router;
