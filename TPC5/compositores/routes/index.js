var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('index', { title: 'Pagina Inicial', data: d });
});

router.get('/compositores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores')
    .then(resposta => {
      res.render('listaCompositores', { lista: resposta.data, data: d, title: 'Lista de Compositores' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na listagem de compositores' });
    });
});

router.get('/periodo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodo')
    .then(resposta => {
      res.render('listaPeriodo', { lista: resposta.data, data: d, title: 'Lista de Periodos' });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro na listagem de periodos' });
    });
})


module.exports = router;
