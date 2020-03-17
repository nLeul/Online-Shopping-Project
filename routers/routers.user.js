const express = require('express');
const userController = require('../controllers/controllers.user');

const routes = express.Router();

routes.get("/sign-up",userController.getSignUpPage);
routes.post('/sign-up', userController.postSignUp);

routes.get('/confirm/:userid', userController.getConfirmationPage);
routes.post('/confirm', userController.postConfirmation);

routes.get('/login', userController.getLoginPage);
routes.post('/login', userController.postLogin);

routes.get('/forgot-password', userController.getForgotPasswordPage);
routes.post('/forgot-password', userController.postForgotPassword);
routes.get('/logout',userController.logout);
routes.get('/success', userController.successPage);

module.exports = routes;