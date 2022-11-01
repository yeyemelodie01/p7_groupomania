const UserModel = require('../models/user.model');

exports.createOneRequest = async (req, res) => {
  // req.body est pour les demandes POST. Pensez au "corps du facteur".
  // déstructure la valeur du nom du corps de la requête.
  const {email, password} = req.body;

  // vérifier si la base de données contient déjà ce nom.
  const foundUser = await UserModel.find({email});

  // si aucun utilisateur n'est trouvé, nous pouvons ajouter cet utilisateur à la base de données.
  if(!foundUser || foundUser.length === 0) {
    const user = new UserModel({email, password});
    const response = await user.save();
    res.status(201).json(response);
  } else {
    res.status(409).json({message: "User already exists!"});
  }
}


exports.readOneRequest = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.
  const {userId} = req.body;

  // attempt to retrieve user
  const foundUser = await UserModel.findOne({userId: userId});




  // return 404 if no user found, return user otherwise.
  if(!foundUser || foundUser.length === 0) {
    res.status(404).json({message: "User not found!"});
  } else {
    res.status(302).json(foundUser);
  }
}
