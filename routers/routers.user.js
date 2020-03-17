const express = require('express');
const userController = require('../controllers/controllers.user');
const productController = require('../controllers/controllers.product');

const routes = express.Router();
//no need Authentication (public functionality)
routes.get('/', productController.getHomePage);

routes.get("/sign-up",userController.getSignUpPage);
routes.post('/sign-up', userController.postSignUp);

routes.get('/confirm/:userid', userController.getConfirmationPage);
routes.post('/confirm', userController.postConfirmation);

routes.get('/login', userController.getLoginPage);
routes.post('/login', userController.postLogin);

routes.get('/forgot-password',userController.getForgotPasswordPage);
routes.post('/forgot-password', userController.postForgotPassword);
<<<<<<< HEAD

routes.get('/logout',userController.getLogout);      
=======
>>>>>>> 00280aa35c4c5265b4501d31521f0cf8050d0bd2

routes.get('/logout',userController.getLogout);

//below, no need Authorization 
routes.get('/details/:prodId', productController.getDetailsOfProduct);

module.exports = routes;   //abelnedi85@gmail.com