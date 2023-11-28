import multer from 'multer'
import path  from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
console.log('this is multer');
    cb(null, 'backend/public/images');
  },

  filename: (req, file, cb) => {
    const name =file.fieldname + "_" + Date.now() + path.extname(file.originalname)
// console.log(name,'this is name in the multer');
    cb(null, name);
    console.log('this is multer last');
  }, 
}); 
console.log(storage,'this is storage');
export const upload = multer({ storage:storage });

