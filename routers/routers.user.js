const express = require('express');
const userController = require('../controllers/controllers.user');
const Authontication = require('../middleware/authentication');
const Permit = require('../middleware/authorization');

const routes = express.Router();

routes.get("/sign-up",userController.getSignUpPage);
routes.post('/sign-up', userController.postSignUp);

routes.get('/confirm/:userid', userController.getConfirmationPage);
routes.post('/confirm', userController.postConfirmation);

routes.get('/login', userController.getLoginPage);
routes.post('/login', userController.postLogin);

//routes.post('/loggout', userController.postLogout);

routes.get('/forgot-password',Authontication,Permit('customer'),userController.getForgotPasswordPage);
routes.post('/forgot-password', userController.postForgotPassword);

routes.get('/success', userController.successPage);

module.exports = routes;   //abelnedi85@gmail.com