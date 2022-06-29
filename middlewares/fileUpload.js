
const mongoose = require('mongoose');
const multer = require('multer')({dest: 'uploads/'});
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;



// Mongo URI
const mongoURI = "mongodb://localhost:27017/gResturant";


// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
  }
});

module.exports  = multer({ storage})