var express = require('express');
var router = express.Router();
var atletas = require('../controllers/modalidades')


router.get('/', function(req, res) {
    atletas.desportos()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  });
  
  router.get('/:modalidade', function(req, res) {
    atletas.atletasDesporto(req.params.modalidade)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  });

module.exports = router;