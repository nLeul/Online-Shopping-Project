const fs = require('fs');
const path = require('path');
const User = require('../models/models.user');
const nodemailer = require('nodemailer');

module.exports = class UserService{
    
    static checkSignupValidation(req){       // check validation to signup 

        req.check('firstname',"must have first name").isLength({ min: 1 });
        req.check('lastname',"must have last name").isLength({ min: 1 });
        req.check('age',"age must be number").isNumeric();
        req.check('email',"insert valid email address").isEmail();
        req.check('password','Passwords do not match.').equals(req.body.confirmPassword);
        req.check('password', "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
        req.check('image',"must have product image").isLength({ min: 1 });
        let errors = req.validationErrors();
        if(errors){
            req.flash('signup-error',errors);
            return false;
        }else{
            return true;
        }
    }

    static createNewUser(req,pw){     // create new user
         return new User({
            firstname : req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            email: req.body.email,
            password: pw,
            image: this.convertToBase64(req.body.image),
            role: req.body.role
         });
    }

   static convertToBase64(image){          // convert image to string
        let buff = fs.readFileSync(image);
        let base64data = buff.toString('base64');
        return base64data;
    } 

    static sendEmailToCustomer(customerEmail){     // email to customer 
        let mailOp = {
            from: "codewarriorstestemail@gmail.com",
            to: customerEmail,
            subject: "Confirmation Number",
            html: "<pre>  your confirmation number is =>    <b>"+this.hashCode(customerEmail) +"</b></pre>"
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'codewarriorstestemail@gmail.com',
                pass:'msd12345'
            }
        });
        transporter.sendMail(mailOp,function(e,info){
            if(e){
                console.log(e);
            }else{
                console.log("email sent: "+info.response);
            }
      });
    }

    static hashCode(s) {      // hash code
        let hash = 0;
    for (let i = 0; i < s.length; i++) {
        let character = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
    }

    static changePasswordValidation(req){
        req.check('email',"insert valid email address").isEmail();
        req.check('password','Passwords do not match.').equals(req.body.confirmPW);
        req.check('password', "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
        let errors = req.validationErrors();
        if(errors){
            req.flash('changepw-error',errors);
            return false;
        }else{
            return true;
        }
    }

}