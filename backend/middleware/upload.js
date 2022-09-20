const multer = require('multer');
let fs = require('fs-extra');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, files, callback) => {
    fs.mkdirsSync('uploads');
    callback(null, 'uploads')
  },
  filename: (files, callback) => {
    const name = files.originalname.split('.').join('_');
    const extension = MIME_TYPES[files.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage}).single('files');
