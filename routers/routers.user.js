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

routes.get('/forgot-password',userController.getForgotPasswordPage);
routes.post('/forgot-password', userController.postForgotPassword);

routes.get('/logout',userController.getLogout);
//routes.get('/success', userController.successPage);

module.exports = routes;   //abelnedi85@gmail.com