const postModel = require('../models/post.model');

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
        "media": `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
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
}

function savePosts(post, res) {
    return post.save()
        .then(() => res.status(201).json({message: "post ajouter"}))
        .catch(error =>  res.status(400).json({error}));
}

// exports.postAddDetailPostsRequest = async (req, res) => {
//   const { userId, detailPosts } = req.body;
// }
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
