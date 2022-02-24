import multer from "multer";
import path from "path";

// optimized function to upload Image Files in uploads folder
const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/profile");
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, `${Date.now()}-${fileName}`);
    },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (
        ext !== ".png" &&
        ext !== ".jpg" &&
        ext !== ".jpeg" &&
        ext !== "gif"
      ) {
        return cb(new Error("Only images are allowed"));
      }
      cb(null, true);
    },
  }),
});

const uploadAudio = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "audio") {
        // if audio file
        cb(null, "./upload/song");
      } else {
        // if image file
        cb(null, "./public/images/thumbnail");
      }
    },
    filename: function (req, file, callback) {
      console.log(file);
      if (file.originalname.length > 6)
        callback(
          null,
          file.fieldname +
            "-" +
            Date.now() +
            file.originalname.slice(file.originalname.length - 4)
        );
      else
        callback(null, file.fieldname + "-" + Date.now() + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "audio") {
      const fileTypes = /mp3|wav|mpeg/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(
        "Error: File upload only supports the following file types - " +
          fileTypes
      );
    } else {
      // if image file
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/gif"
      ) {
        // check file type to be png, jpeg, or jpg
        return cb(null, true);
      } else {
        cb("Error: Thumnail should be image type.", false); // else fail
      }
    }
  },
});

export { uploadImage, uploadAudio };
