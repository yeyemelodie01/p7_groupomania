const express = require('express');
const urlRoutes = express.Router();

urlRoutes.get('/');
urlRoutes.get('/:id');
urlRoutes.post('/');
urlRoutes.put('/:id');
urlRoutes.delete('/:id');
urlRoutes.post('/:id/like');

module.exports = urlRoutes;
