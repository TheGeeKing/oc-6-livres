import multer from "multer";

const storage = multer.memoryStorage();

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg": "svg",
  "image/webp": "webp",
};

const fileFilter = (_, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type."));
  }
};

const upload = multer({ storage, fileFilter }).single("image");

export default upload;
