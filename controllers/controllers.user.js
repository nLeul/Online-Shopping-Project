const bcrypt = require('bcryptjs');
const User = require('../models/models.user');
const UserService = require('../service/service.user');

exports.getSignUpPage = (req,res,next)=>{
    let msgs;
   let flashArr = req.flash('signup-error');
    if(flashArr.length > 0){
        msgs=flashArr
    }else{
        msgs=null;
    } 
      res.render("user/sign-up",{ title:"sign up", errMsg: msgs, isAuthenticated: false, errConfirm: req.flash('signup-success')});
}

exports.postSignUp = (req,res,next)=>{
     if(UserService.checkSignupValidation(req)){
       User.findOne({email : req.body.email})
       .then(user=>{
           if(user){
               req.flash("exist-user","you are  our customer, if U forget password please click forget button");
               res.redirect('/login');
           }else{
          
          bcrypt.hash(req.body.password, 12)
          .then(hashPW => {
              UserService.createNewUser(req,hashPW).save()
              .then(savedUser=>{
               UserService.sendEmailToCustomer(savedUser.email);
                res.redirect('/confirm/'+savedUser._id);
              });
          });
        }
       })
       .catch(e=>console.log(e));
     }else{
        res.redirect('/sign-up');
     }
}

exports.getConfirmationPage = (req,res,next)=>{
      res.render('user/confirm-page', { title:"confirmation page", userid:req.params.userid});
}
exports.postConfirmation = (req,res,next)=>{
    User.findById(req.body.userid)
    .then(user=>{
        if(req.body.confirm == UserService.hashCode(user.email)){
            req.flash('signup-success',"your signup is Succesfull !!, Login now.");
            res.redirect('/login');
        }else{
            req.flash('signup-success',"your confirmation is not correct, please re-signup. ");
            User.findByIdAndRemove(req.body.userid)
            .then(r=>{
                res.redirect('/sign-up');
            });
        }
    })
    .catch(e=>console.log(e));
}

exports.getLoginPage = (req,res,next)=>{ 
     res.render("user/login",{ title:"login", chngErr: req.flash('changepw-error'), isAuthenticated: false, errConfirm: req.flash('signup-success'), existUserMsg: req.flash('exist-user') });
}
exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        
                        req.session.isAuthenticated = true;
                        req.session.user = user;
                        
                        return req.session.save(err => {
                            if(user.role == "admin"){
                                res.redirect('/admin-prds');
                            }else{
                                res.redirect('/customer-prds');
                            }                         
<<<<<<< HEAD
=======

>>>>>>> 00280aa35c4c5265b4501d31521f0cf8050d0bd2
                        })
                    } else {
                        req.flash('signup-success', 'Invalid Username and Password!!');
                        res.redirect('/login');
                    }
                });
        } else {
            req.flash('signup-success', 'Invalid Username and Password!');
            res.redirect('/login');
        }
    }).catch(err => {
        console.log(err);
    });
}

exports.getLogout = (req,res,next)=>{
    //console.log(req.session.user);
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }else{
        // console.log(req.session.user);
        // req.session.isAuthenticated = false;
         return res.redirect('/');
        }
    });
}

exports.getForgotPasswordPage = (req,res,next)=>{
     res.render("user/forgot-pw", { title:"forgot"});
}
exports.postForgotPassword = (req,res,next)=>{
    if(!UserService.changePasswordValidation(req)){
        res.redirect('/login');
    }else{
     User.findOne({email: req.body.email})
     .then(user=>{
         if(user){
          bcrypt.hash(req.body.password, 12)
          .then(hashPw=>{
               user.password = hashPw;
               user.save().then(updateUser=>{
                req.flash('signup-success',"password change is successfull! ")
                res.redirect('/login');
               });
          })
         }else{
            req.flash('signup-success',"you are not our customer, or check your email ")
            res.redirect('/login');
         }
     })
     .catch(e=>console.log(e));
    }
}

<<<<<<< HEAD
exports.successPage = (req,res,next)=>{
    res.send("success");
}
=======
>>>>>>> 00280aa35c4c5265b4501d31521f0cf8050d0bd2
