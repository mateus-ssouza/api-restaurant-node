const multer = require('multer');
const path = require('path');
const CustomError = require('../handleErrors/CustomError');

// Função para determinar o destino do upload da imagem
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

// Função para realizar upload da imagem
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new CustomError('A imagem enviada deve ser png ou jpeg.', 400));
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload };
