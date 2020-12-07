var express = require('express');
var router = express.Router();

const Grid = require('gridfs-stream');
var mongoose = require('mongoose');

var conn = mongoose.connection;

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const fileUtils = require('../../utils/fileUpload');
//Upload images to MongoDB
router.post('/upload', fileUtils.upload.single('upload'), (req, res) => {
  res.json({ file: req.file });
});

// Get the list of image object (in an array)
router.get('/files', (req, res) => {
  console.log(fileUtils);
  gfs.files.find().toArray((err, files) => {
    //check if files exist
    if (!files || files.length == 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }
    return res.json(files);
  });
});

// Get a single image object
router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //check if files exist
    if (!file || file.length == 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }
    //file exist
    return res.json(file);
  });
});

//Display the actual image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //check if files exist
    if (!file || file.length == 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }
    //check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
      //read output to browser
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

// Delete an image
router.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'imageUpload' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.redirect('/');
  });
});

module.exports = router;
