var express = require('express');
var router = express.Router();
var atletas = require('../controllers/atletas')

/* GET home page. */
router.get('/', function(req, res) {
  atletas.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/', function(req, res) {
  atletas.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.put('/:id', function(req, res) {
  atletas.Update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/:id', function(req, res) {
  atletas.delete(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});



module.exports = router;
