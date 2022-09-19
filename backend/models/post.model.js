const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId:{ type:String, required:true },
  title:{ type:String, required:true },
  //media:{ type:String },
  text:{ type:String },
  likes:{ type:Number, default:0 },
  dislikes:{ type:Number, default:0 },
  usersLiked: { type: [String] },
  usersDisLiked: { type: [String] }
})

module.exports = mongoose.model('Post', postSchema);
