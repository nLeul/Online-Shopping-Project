const express = require('express');
const userController = require('../controllers/controllers.user');
const productController = require('../controllers/controllers.product');

const routes = express.Router();

routes.get('/', productController.getHomePage);

routes.get("/sign-up",userController.getSignUpPage);
routes.post('/sign-up', userController.postSignUp);

routes.get('/confirm/:userid', userController.getConfirmationPage);
routes.post('/confirm', userController.postConfirmation);

routes.get('/login', userController.getLoginPage);
routes.post('/login', userController.postLogin);

//routes.post('/loggout', userController.postLogout);

routes.get('/forgot-password',userController.getForgotPasswordPage);
routes.post('/forgot-password', userController.postForgotPassword);
<<<<<<< HEAD

routes.get('/logout',userController.getLogout);      

//routes.get('/success', userController.successPage);
=======
routes.get('/logout',userController.logout);
routes.get('/success', userController.successPage);
>>>>>>> 14305c20107e4fa18451837585da7799be888aef

module.exports = routes;   //abelnedi85@gmail.com