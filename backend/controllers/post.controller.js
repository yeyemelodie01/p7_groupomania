const postModel = require('../models/post.model');
const cloudinary = require('../middleware/cloud')
//const fs = require('fs')

exports.postRequest = async(req, res) => {
    postModel.find()
      .then((post) => res.status(200).json(post))
      .catch(error => res.status(400).json({error}));
}

exports.postIdRequest = async(req, res) => {
    postModel.findOne({ _id: req.params.id })
      .then((post) => res.status(200).json(post))
      .catch(error => res.status(400).json({error}));
}

exports.postAddRequest = async(req, res) => { // export de la fonction postAddRequest qui pour valeur une fonction asynchrone avec la valeur req et res
  const { userId, postType, post, userName } = req.body //constante userId... qui récupère les données envoyer par le front avec req.body
  let title = "";
  if ('media' === postType) {
      title = req.body.title;
  }

  if ('text' === postType) {
      title = post.title;
  }

  const result = await cloudinary.uploader.upload(req.file.path);
  const dataPost = await postModel.find({title: title});
  if(dataPost.length > 0) {
    res.status(200).json({message: "post déja ajouter"});
    return;
  }

  try {
    if ('media' === postType) {
      const newPost = new postModel({
        "userId": userId,
        "userName": userName,
        "title": title,
        "public_id": result.public_id,
        "media": result.secure_url ,
      });
      return savePosts(newPost, res);
    }

    if ('text' === postType) {
      const newPost = new postModel({
        "userId": userId,
        "userName": userName,
        "title": title,
        "text": post.text,
      });
      return savePosts(newPost, res);
    }
  } catch (error) {
    res.status(400).json({error})
  }

  function savePosts(post, res) {
    return post.save()
      .then(() => res.status(201).json({message: "post ajouter"}))
      .catch(error =>  res.status(400).json({error}));
  }
}

exports.postAddFeedBackRequest = async (req, res) => {
  const { userId, feedBack } = req.body;
  console.log(userId, feedBack)
  const postId = req.params.id;
  console.log(postId);
  //let post = await postModel.findOne({_id: postId});


  //let post = await postModel.findOne({_id: postId});
  res.status(200).json({ message: 'infos bien reçu'});
  res.status(400).json({ message: 'infos non reçu' })
}

exports.postUpdateRequest = async(req, res) => {
  const media = req.body.public_id;
  const text = req.body.text;
  if(media){
        cloudinary.uploader.destroy(media);
        const newImg = await cloudinary.uploader.upload(req.file.path)

    const dataUpdate = req.file ? {
          ...req.body,
          public_id: newImg.public_id,
          media: newImg.secure_url,
    } : { ...req.body };
      postModel.updateOne({ _id: req.params.id }, { ...dataUpdate, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Mise a jour des informations'}))
        .catch(error => res.status(400).json({ error }));
  }
  if(text){



    const dataUpdate = req.file ? {
      ...req.body,//
      public_id:req.body.public_id,
      media: req.body.media,// url pour l'image req.protocol(http), req.get('host) pour l'hôte de serveur ici localhost:3000, uploads(dossier qui contiendra l'image), req.file.filename pour le nom du fichier
    } : { ...req.body };//
    postModel.updateOne({ _id: req.params.id }, { ...dataUpdate, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Mise a jour des informations'}))
      .catch(error => res.status(400).json({ error }));
  }


}

exports.postDeleteRequest = async(req, res) => {
  postModel.findOne({_id: req.params.id})
    .then((data) => {
      const media = data.public_id;
      if(media){
        cloudinary.uploader.destroy(media);
      }
      postModel.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message: 'Post supprimé'}))
        .catch(error => res.status(400).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
}

exports.postLikeRequest = async (req, res) => {
  const {userId, like} = req.body;
  const postId = req.params.id;
  let post = await postModel.findOne({_id: postId});

  if (like === 1 && post.usersLiked.includes(userId) === false) {
    if (post.usersDisliked.includes(userId)) {
      postModel.updateOne({_id: postId}, {$set: {usersDisliked: post.usersDisliked.filter(item => item !== userId)}})
        .catch(err => res.status(404).json(err))

      let dislikes = post.dislikes - 1;
      postModel.updateOne({_id: postId}, {$set: { dislikes : dislikes }})
        .catch(err=> res.status(404).json(err))
    }

    postModel.updateOne({_id: postId},{$addToSet: { usersLiked : [userId]}})
      .catch(err => res.status(404).json(err))

    let likes = post.likes + 1;
    postModel.updateOne({_id: postId}, {$set: { likes : likes }})
      .catch(err=> res.status(404).json(err))
  }

  if(like === -1 && post.usersDisliked.includes(userId) === false) {
    if (post.usersLiked.includes(userId)) {
      postModel.updateOne({_id: postId}, {$set: {usersLiked: post.usersLiked.filter(item => item !== userId)}})
        .catch(err => res.status(404).json(err))

      let likes = post.likes - 1;
      postModel.updateOne({_id: postId}, {$set: { likes : likes }})
        .catch(err=> res.status(404).json(err))
    }

    postModel.updateOne({_id: postId}, {$addToSet: { usersDisliked : [userId]}})
      .catch(err=> res.status(404).json(err))
    let dislikes = post.dislikes + 1;
    postModel.updateOne({_id: postId}, {$set: { dislikes : dislikes }})
      .catch(err=> res.status(404).json(err))
  }

  post = await postModel.findOne({_id: postId});
  res.status(200).json(post);
}
