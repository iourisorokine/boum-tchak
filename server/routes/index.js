const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  console.log('Index req status code:', req.statusCode)
  const randomNumber = Math.ceil(Math.random() * 1000);
  console.log(`Generating random number... ${randomNumber}`)
  console.log('Response status code:', res.statusCode, res.statusMessage)
  res.render('index');
});

module.exports = router;
