const mongoose = require ('mongoose');

const textSchema = mongoose.Schema({
  userid:{ type:String, required:true },
  postname:{ type:String, required:true },
  text:{ type:String },
  like:{ type:Number, default:0 },
  dislike:{ type:Number, default:0 },
  usersLiked: { type: [String] },
  usersDisLiked: { type: [String] }
})

module.exports = mongoose.model('Text', textSchema)
