const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userid:{ type:String, required:true },
  postname:{ type:String, required:true },
  media:{ type:String },
  text:{ type:String },
  like:{ type:Number, default:0 },
  dislike:{ type:Number, default:0 },
  usersLiked: { type: [String] },
  usersDisLiked: { type: [String] }
})

module.exports = mongoose.model('Post', postSchema);
