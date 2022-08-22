const express = require('express');
const urlRoutes = express.Router();
const controller = require('../controllers/post.controller');
const userAuth = require('../middleware/auth');
const upload = require('../middleware/upload')


urlRoutes.get('/', userAuth, controller.postRequest);
urlRoutes.get('/:id', userAuth, controller.postIdRequest);
urlRoutes.post('/', userAuth, upload, controller.postAddRequest);
urlRoutes.put('/:id', userAuth, upload, controller.postUpdateRequest);
urlRoutes.delete('/:id', userAuth, controller.postDeleteRequest);
urlRoutes.post('/:id/like', userAuth, controller.postLikeRequest);

module.exports = urlRoutes;
