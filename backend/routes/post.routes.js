const express = require('express');
const urlRoutes = express.Router();
const controller = require('../controllers/post.controller');
const userAuth = require('../middleware/auth');


urlRoutes.get('/',userAuth,controller.postRequest);
urlRoutes.get('/:id',userAuth,controller.postIdRequest);
urlRoutes.post('/',userAuth,controller.postAddRequest);
urlRoutes.put('/:id',userAuth,controller.postUpdateRequest);
urlRoutes.delete('/:id',userAuth,controller.postDeleteRequest);
urlRoutes.post('/:id/like',userAuth,controller.postLikeRequest);

module.exports = urlRoutes;
