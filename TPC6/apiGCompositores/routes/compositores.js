var express = require('express');
var router = express.Router();
var Compositores = require('../controllers/compositores')

/* GET home page. */
router.get('/compositores', function(req, res) {
  Compositores.list()
    .then(dados => {
      console.log('Dados received from MongoDB:', dados); // This will log the output from MongoDB
      res.status(200).jsonp(dados);
    })
    .catch(erro => {
      console.error('Error fetching compositores:', erro); // This will log if there's an error
      res.status(500).jsonp(erro);
    });
});

module.exports = router;
