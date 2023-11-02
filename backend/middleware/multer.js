import multer from 'multer'
import path  from 'path';
console.log('this is multer file');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join('./public/images'));
//       console.log('image is here')
//     },
//     filename: (req, file, cb) => {
//       console.log('fileName', file.originalname);
//       cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     },
//   });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('haaaaaaaai',file)
    cb(null, 'backend/public/images');
  },
  filename: (req, file, cb) => {
    const name =file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    console.log(name,'name')
    cb(null, name);
  }, 
}); 

export const upload = multer({ storage:storage });

