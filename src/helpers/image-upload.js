const multer = require('multer');
const path = require('path');

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '';
        
        if (req.originalUrl.includes('produtos') && req.originalUrl.includes('restaurantes')) {
            folder = 'products';
        } else if (req.originalUrl.includes('restaurantes')) {
            folder = 'restaurants';
        }
        
        cb(null, `src/public/images/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Por favor, envie apenas png ou jpg!'));
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload };