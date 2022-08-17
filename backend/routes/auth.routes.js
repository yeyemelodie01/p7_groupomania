const express = require( 'express' );
const urlRoutes = express.Router();

const auth = require('../controllers/auth.controller')

urlRoutes.post('/signup',auth.signUpRequest);
urlRoutes.post('/login', auth.loginRequest);

module.exports = urlRoutes;
