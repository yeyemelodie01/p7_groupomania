const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId:{ type:String, required:true },
  userName:{ type:String, required:true },
  title:{ type:String, required:true },
  media:{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
    required: true
    }
  },
  text:{ type:String },
  likes:{ type:Number, default:0 },
  dislikes:{ type:Number, default:0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  feedBack: { type:String },
  usersFeedBack:{ type: [String] },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema);
