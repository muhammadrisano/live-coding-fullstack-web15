const express = require('express');
const Router = express.Router();
const bookController = require('../controller/book');
const authHelper = require('../helpers/auth');
const cors = require('cors');
// const redisHelper = require('../helpers/redis');

// multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname)
  },
})
const upload = multer({
  storage
})

Router
  .get('/',  bookController.getBooks)
  .get('/:id_book', bookController.bookDetail)
  .post('/', upload.single('image'), bookController.insertBook)
  .patch('/:id_book',  bookController.updateBook)
  .delete('/:id_book', bookController.deleteBook)
  // .post('/insert', (req, res) => res.send('ini buku ke 1'))

module.exports = Router;