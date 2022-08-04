exports.createOneRequest = async (req, res) => {
  // req.body est pour les demandes POST. Pensez au "corps du facteur".
  // déstructure la valeur du nom du corps de la requête.
  const {name} = req.body;

  // vérifier si la base de données contient déjà ce nom.
  const foundUser = await UserModel.find({name});

  // si aucun utilisateur n'est trouvé, nous pouvons ajouter cet utilisateur à la base de données.
  if(!foundUser || foundUser.length == 0) {
    const user = new UserModel({name});
    const response = await user.save();
    res.status(201).json(response);
  } else {
    res.status(409).json({message: "User already exists!"});
  }
}


exports.readOneRequest = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.
  const {id} = req.params;

  // attempt to retrieve user
  const foundUser = await UserModel.findOne({_id: id});

  // return 404 if no user found, return user otherwise.
  if(!foundUser || foundUser.length == 0) {
    res.status(404).json({message: "User not found!"});
  } else {
    res.status(302).json(foundUser);
  }
}
