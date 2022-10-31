const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId:{ type:String, required:true },
  userName:{ type:String, required:true },
  title:{ type:String, required:true },
  public_id: { type:String },
  media:{ type:String },
  text:{ type:String },
  likes:{ type:Number, default:0 },
  dislikes:{ type:Number, default:0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  feedBack: { type:[String] },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema);
