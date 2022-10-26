const express = require('express');
const urlRoutes = express.Router();
const controller = require('../controllers/post.controller');
const userAuth = require('../middleware/auth');
const upload = require('../middleware/upload')


urlRoutes.get('/', controller.postRequest);
urlRoutes.get('/:id', controller.postIdRequest);
urlRoutes.post('/create', userAuth, upload, controller.postAddRequest);
urlRoutes.post('/:id/feedback', userAuth, controller.postAddFeedBackRequest);
urlRoutes.put('/:id', userAuth, upload, controller.postUpdateRequest);
urlRoutes.delete('/:id', userAuth, controller.postDeleteRequest);
urlRoutes.post('/:id/like', userAuth, controller.postLikeRequest);

module.exports = urlRoutes;
