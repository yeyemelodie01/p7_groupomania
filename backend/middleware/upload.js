const multer = require('multer');

const imgTypes = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = imgTypes[file.imgtype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage}).single('images');
