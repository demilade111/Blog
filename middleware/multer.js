const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    destination: (req, file, cb) => {
      cb(null, "uploads");
    };

  },
  filename: function (req, file, cb) {
   new Date().toISOString().replace(/:/g, "-");
  },
});

const upload = multer({
    storage:storage
})

module.exports = upload;