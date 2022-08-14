const express = require( 'express' );
const urlRoutes = express.Router();

urlRoutes.post('/signup');
urlRoutes.post('/login');

module.exports = urlRoutes;
