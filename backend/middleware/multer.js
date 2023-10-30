import multer from 'multer'
import path  from 'path';
console.log('this is multer file');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'backend/public/images');
      console.log('image is here')
    },
    filename: (req, file, cb) => {
      console.log('fileName', file.originalname);
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
  });

export  const upload = multer({ storage });
