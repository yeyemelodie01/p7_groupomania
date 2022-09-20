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
  const {userId, postType, post} = req.body;
  const dataPost = await postModel.find({title: post.title});
  if(dataPost.length > 0) {
    if ('media' === postType) {
      const dataUpdate = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` // url pour l'image req.protocol(http), req.get('host) pour l'hôte de serveur ici localhost:3000, uploads(dossier qui contiendra l'image), req.file.filename pour le nom du fichier
    } : { ...req.body };
      console.log(dataUpdate);
    }
    res.status(200).json({message: "post déja ajouter"});
    return;
  }
  try {
    const newPost = new postModel({
      "userId": userId,
      "title": post.title,
      "text": post.text,
      "like": 0,
      "dislike": 0,
      "usersLiked": [],
      "usersDisLiked": [],
    });
    newPost.save()
      .then(() => res.status(201).json({message: "post ajouter"}))
      .catch(error =>  res.status(400).json({error}));
  } catch (error) {
    res.status(400).json({error})
  }
}

//exports.postUpdateRequest = async(req) => {
//    const dataUpdate = req.file ? {
//                 ...req.body,//
//                 imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` // url pour l'image req.protocol(http), req.get('host) pour l'hôte de serveur ici localhost:3000, uploads(dossier qui contiendra l'image), req.file.filename pour le nom du fichier
//             } : { ...req.body };//
//         postModel.updateOne({ _id: req.params.id }, { ...dataUpdate, _id: req.params.id })
//             .then(() => res.status(200).json({ message: 'Mise a jour des informations'}))
//             .catch(error => res.status(400).json({ error }));
//}

//exports.postDeleteRequest = async(req) => {
//    req.status(200).json({message:"delete post"})
//}

//exports.postLikeRequest = async(req) => {
//    req.status(200).json({message:"like post"})
//}
