const multer = require('multer');
const cloudinary = require ('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
//let fs = require('fs-extra');

cloudinary.config({
  
})

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};
//fs.mkdirsSync('uploads');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads")
  },
  filename: (req, files, callback) => {
    const name = files.originalname.split('.').join('_');
    const extension = MIME_TYPES[files.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
})

module.exports = multer({storage}).single('files');
