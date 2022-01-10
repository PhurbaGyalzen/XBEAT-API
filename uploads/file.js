import multer from "multer";
import path from "path";

// optimized function to upload Image Files in uploads folder
const uploadImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, `${Date.now()}-${fileName}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});


const uploadAudio = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const fileTypes = /mp3|wav/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following file types - " + fileTypes);
  },
});


export { uploadImage, uploadAudio };
