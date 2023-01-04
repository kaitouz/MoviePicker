const multer = require('multer')
const path = require('path');
const { root } = require('../config/image.config');

const imageStorage = multer.diskStorage({
    destination: root,
    filename: (req, file, cb) => {
        cb(null, file.originalname.substring(0, 10) + '_' + Date.now()
            + path.extname(file.originalname))
    }
});

exports.imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) {
            return cb(new Error('Please upload a Image'))
        }
        
        cb(undefined, true)
    }
}) 