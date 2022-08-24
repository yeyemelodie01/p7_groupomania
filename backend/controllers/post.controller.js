const postModel = require('../models/post.model');
//const fs = require('fs')

exports.postRequest = async(req, res) => {
    postModel.find()
      .then((post) => req.status(200).json(post))
      .catch(error => res.status(400).json({error}));
}

exports.postIdRequest = async(req, res) => {
    postModel.findOne({ _id: req.params.id })
      .then((post) => req.status(200).json(post))
      .catch(error => res.status(400).json({error}));
}

exports.postAddRequest = async(req, res) => {
   const data = JSON.parse(req.body.post);
   const dataPost = await postModel.find({postname: data.postname});
   if(dataPost.length > 0) {
       res.status(200).json({message: "post déja ajouter"});
   }
   try {
       const post = new postModel({
           userId: data.userId,
           postname: data.postname,
           media: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
           text: data.text,
           like: 0,
           dislike: 0,
           usersLiked: [],
           usersDisLiked: [],
       });
       post.save()
         .then(() => res.status(201).json({message: "post ajouter"}))
         .catch(error =>  res.status(400).json({error}));
   } catch (error) {
       res.status(400).json({error})
   }
}

//exports.postUpdateRequest = async(req) => {
//    req.status(200).json({message:"Update post"})
//}

//exports.postDeleteRequest = async(req) => {
//    req.status(200).json({message:"delete post"})
//}

//exports.postLikeRequest = async(req) => {
//    req.status(200).json({message:"like post"})
//}
